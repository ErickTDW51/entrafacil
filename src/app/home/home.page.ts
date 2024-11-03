import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  constructor(
    private navCtrl: NavController,
    private ToastCtrl: ToastController // Inyecta aquí el ToastController
  ) {}

  config() {
    this.navCtrl.navigateForward('/config');
  }

  perfil() {
    this.navCtrl.navigateForward('/profile');
  }

  pin() {
    this.navCtrl.navigateForward('/pin');
  }

  async toast(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.ToastCtrl.create({
      message: '¡Alerta activada!',
      duration: 2000,
      position: position,
    });

    await toast.present();
  }
}
