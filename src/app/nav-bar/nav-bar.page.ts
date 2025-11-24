import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { IonicModule, NavController } from '@ionic/angular';
import { Router, NavigationEnd } from '@angular/router';
import { filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [IonicModule],
  templateUrl: './nav-bar.page.html',
  styleUrls: ['./nav-bar.page.scss'],
})
export class NavBarPage implements AfterViewInit, OnDestroy {
  // Usamos 3 elementos: 0 = alarmas, 1 = notificaciones (centro), 2 = dispositivos
  activeIndex = 1; // centro activo por defecto

  // Iconos para cada posición
  iconNames = ['alarm-outline', 'notifications-outline', 'watch-outline'];

  // Porcentaje actual (0-100) de la izquierda donde se posiciona el bubble.
  bubbleLeftPercent = this.computePercentForIndex(this.activeIndex);

  @ViewChild('nav', { static: true }) navEl!: ElementRef<HTMLElement>;

  private dragging = false;
  private startX = 0;
  private startLeftPercent = 0;
  private containerWidth = 1;
  private onPointerMoveBound = this.onPointerMove.bind(this);
  private onPointerUpBound = this.onPointerUp.bind(this);

  private routerSub?: Subscription;

  constructor(private navCtrl: NavController, private router: Router) {}

  // Calcula la posición izquierda (en %) del bubble para un índice dado
  computePercentForIndex(i: number): number {
    // Para 3 columnas: centros en 16.666%, 50%, 83.333%
    return i * (100 / 3) + 100 / 6;
  }

  setActive(i: number) {
    this.activeIndex = i;
    // animamos el bubble hacia la posición objetivo
    this.bubbleLeftPercent = this.computePercentForIndex(i);
    this.updateCssVar();

    switch (i) {
      case 0:
        this.navCtrl.navigateForward('/alarmas');
        break;
      case 1:
        this.navCtrl.navigateForward('/notificaciones');
        break;
      case 2:
        this.navCtrl.navigateForward('/dispositivos');
        break;
    }
  }

  ngAfterViewInit(): void {
    const rect = this.navEl.nativeElement.getBoundingClientRect();
    this.containerWidth = rect.width || 1;
    // inicializamos la variable CSS
    this.updateCssVar();
    // sincronizamos la posición con la ruta actual
    this.updateActiveFromUrl(this.router.url);
    // escuchamos cambios de navegación para actualizar la barra
    this.routerSub = this.router.events.pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd)).subscribe((ev) => {
      this.updateActiveFromUrl(ev.urlAfterRedirects || ev.url);
    });
  }

  ngOnDestroy(): void {
    window.removeEventListener('pointermove', this.onPointerMoveBound);
    window.removeEventListener('pointerup', this.onPointerUpBound);
    if (this.routerSub) { this.routerSub.unsubscribe(); this.routerSub = undefined; }
  }

  // Inicia el drag cuando el usuario presiona sobre el bubble
  onPointerDown(ev: PointerEvent) {
    ev.preventDefault();
    this.dragging = true;
    this.startX = ev.clientX;
    this.startLeftPercent = this.bubbleLeftPercent;
    // aseguramos escuchar los movimientos y el release
    window.addEventListener('pointermove', this.onPointerMoveBound);
    window.addEventListener('pointerup', this.onPointerUpBound);
  }

  onPointerMove(ev: PointerEvent) {
    if (!this.dragging) return;
    const dx = ev.clientX - this.startX;
    const dxPercent = (dx / this.containerWidth) * 100;
    const newPercent = this.startLeftPercent + dxPercent;
    // límites (entre la primera y la última posición)
    const min = this.computePercentForIndex(0);
    const max = this.computePercentForIndex(2);
    this.bubbleLeftPercent = Math.min(Math.max(newPercent, min), max);
    this.updateCssVar();
  }

  onPointerUp(_ev: PointerEvent) {
    if (!this.dragging) return;
    this.dragging = false;
    window.removeEventListener('pointermove', this.onPointerMoveBound);
    window.removeEventListener('pointerup', this.onPointerUpBound);
    // al soltar, calculamos el índice más cercano y activamos
    const positions = [this.computePercentForIndex(0), this.computePercentForIndex(1), this.computePercentForIndex(2)];
    let nearest = 0;
    let bestDiff = Infinity;
    for (let i = 0; i < positions.length; i++) {
      const d = Math.abs(this.bubbleLeftPercent - positions[i]);
      if (d < bestDiff) { bestDiff = d; nearest = i; }
    }
    this.setActive(nearest);
    this.updateCssVar();
  }

  private updateCssVar() {
    try { this.navEl.nativeElement.style.setProperty('--bubble-left', this.bubbleLeftPercent + '%'); } catch {}
  }

  private updateActiveFromUrl(url: string) {
    // simple mapping: /alarmas -> 0, /notificaciones -> 1, /dispositivos -> 2
    const path = url.split('?')[0].split('#')[0];
    let idx = 1;
    if (path.includes('/alarmas')) idx = 0;
    else if (path.includes('/dispositivos')) idx = 2;
    else if (path.includes('/notificaciones')) idx = 1;
    // set index and update bubble position, but avoid navigating again
    this.activeIndex = idx;
    this.bubbleLeftPercent = this.computePercentForIndex(idx);
    this.updateCssVar();
  }
}
