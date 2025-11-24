import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { NavBarPage } from '../nav-bar/nav-bar.page';

@Component({
  selector: 'app-dispositivos',
  standalone: true,
  imports: [IonicModule, NavBarPage],
  templateUrl: './dispositivos.page.html',
  styleUrls: ['./dispositivos.page.scss'],
})
export class DispositivosPage {}
