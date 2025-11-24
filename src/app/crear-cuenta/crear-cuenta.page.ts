import { Component } from '@angular/core';
import { IonicModule, NavController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-crear-cuenta',
  standalone: true,
  imports: [IonicModule, FormsModule],
  templateUrl: './crear-cuenta.page.html',
  styleUrls: ['./crear-cuenta.page.scss']
})
export class CrearCuentaPage {

  username = '';
  email = '';
  password = '';
  confirmPassword = '';

  constructor(private navCtrl: NavController) {}

  crearCuenta() {
    // Aquí podrías llamar a tu servicio de registro. Por ahora navegamos a notificaciones.
    this.navCtrl.navigateForward('/notificaciones');
  }

  irLogin() {
    this.navCtrl.navigateForward('/');
  }
}
