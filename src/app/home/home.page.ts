import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

@Component({
    selector: 'app-profile',
    templateUrl: './home.page.html',
    styleUrls: ['./home.page.scss'],
    standalone: false
})
export class HomePage {
  constructor(
    private navCtrl: NavController,
   // private alertController: AlertController // Inyecta el controlador de alertas
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
  //funcion para abrir la puerta

  async Abrir() {
    try {
      // Realiza una solicitud GET o POST al ESP32
      const response = await this.http.get(`${this.esp32Ip}/open-door`).toPromise();
      console.log('Respuesta del ESP32:', response);
      //this.showToast('Puerta abierta con éxito', 'success');
    } catch (error) {
      console.error('Error al intentar abrir la puerta:', error);
      //this.showToast('Error al abrir la puerta', 'danger');
    }
  }

  private async showToast(message: string, color: string) {
    const toast = await this.toastCtrl.create({
      message,
      color,
      duration: 2000,
      position: 'bottom',
    });
    await toast.present();
  }
}
