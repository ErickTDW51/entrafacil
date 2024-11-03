import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  constructor(private navCtrl: NavController) { }

  config() {
    this.navCtrl.navigateForward('/config');
  }

  perfil(){
    this.navCtrl.navigateForward('/profile');
  }
}
