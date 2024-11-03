import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-pin',
  templateUrl: './pin.page.html',
  styleUrls: ['./pin.page.scss'],
})
export class PinPage implements OnInit {
  number = 1234; // Tu número de 4 dígitos
  digits: number[] = [];

  constructor(
    private ToastCtrl: ToastController // Inyecta aquí el ToastController
  ) {
    // Divide el número en dígitos
    this.digits = this.number.toString().split('').map(Number);
  }
   // Función para generar un nuevo código de 4 dígitos
   generateNewCode() {
    const code = Math.floor(1000 + Math.random() * 9000); // Genera un número de 4 dígitos
    this.digits = Array.from(String(code), Number); // Convierte el número en un array de dígitos
  }

  ngOnInit() {
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
