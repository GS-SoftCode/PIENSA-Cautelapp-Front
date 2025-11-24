import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./inicio/inicio.page').then(m => m.InicioPage),
  },
  {
    path: 'crear-cuenta',
    loadComponent: () =>
      import('./crear-cuenta/crear-cuenta.page').then(m => m.CrearCuentaPage),
  },
  {
    path: 'notificaciones',
    loadComponent: () =>
      import('./notificaciones/notificaciones.page').then(m => m.NotificacionesPage),
  },
  {

    path: 'alarmas',
    loadComponent: () => import('./alarmas/alarmas.page').then(m => m.AlarmasPage),
  },
  {
    path: 'dispositivos',
    loadComponent: () => import('./dispositivos/dispositivos.page').then(m => m.DispositivosPage),
  },
  {
    path: 'nav-bar',
    loadComponent: () => import('./nav-bar/nav-bar.page').then( m => m.NavBarPage)
  }

];
