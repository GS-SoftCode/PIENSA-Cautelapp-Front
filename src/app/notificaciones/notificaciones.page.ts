import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { NavBarPage } from '../nav-bar/nav-bar.page';

@Component({
  selector: 'app-notificaciones',
  standalone: true,
  imports: [IonicModule, NavBarPage],
  templateUrl: './notificaciones.page.html',
  styleUrls: ['./notificaciones.page.scss']
})
export class NotificacionesPage {}
