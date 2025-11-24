import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { NavBarPage } from '../nav-bar/nav-bar.page';

@Component({
  selector: 'app-alarmas',
  standalone: true,
  imports: [IonicModule, NavBarPage],
  templateUrl: './alarmas.page.html',
  styleUrls: ['./alarmas.page.scss'],
})
export class AlarmasPage {}
