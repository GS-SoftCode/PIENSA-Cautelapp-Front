import { Component } from '@angular/core';
import { IonicModule, NavController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [IonicModule, FormsModule],
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss']
})
export class InicioPage {

  email = '';
  password = '';

  constructor(private navCtrl: NavController) {}

  entrar() {
    this.navCtrl.navigateForward('/notificaciones');
  }

  goRegister() {
    this.navCtrl.navigateForward('/crear-cuenta');
  }
}
