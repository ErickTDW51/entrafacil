import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-profile',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage{
  photoUrl: string = '';
  private esp32Ip = 'http://0.0.0.0'; // Cambia esta IP por la del ESP32
  constructor(
    private http: HttpClient,
     private toastCtrl: ToastController,
    private navCtrl: NavController,
    private alertController: AlertController // Inyecta el controlador de alertas
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
      this.showToast('Puerta abierta con éxito', 'success');
    } catch (error) {
      console.error('Error al intentar abrir la puerta:', error);
      this.showToast('Error al abrir la puerta', 'danger');
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
  

  // Función para mostrar un mensaje de alerta
  async showAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Aviso',
      message: message,
      buttons: ['Aceptar']
    });
    await alert.present();
  }
  async showPanicAlert() {
    const alert = await this.alertController.create({
      header: '¡Alerta de Pánico!',
      message: '¡Has activado el botón de pánico! ¿Estás seguro de que quieres continuar?',
      buttons: [

        {
          text: 'Confirmar',
          handler: () => {
            console.log('Pánico confirmado');
          }
        }
      ],
      cssClass: 'alert-panic', // Estilo personalizado para la alerta
    });
    await alert.present();
  }
  async editPhoto() {
    try {
      // Abre la cámara y toma una foto
      const photo = await Camera.getPhoto({
        quality: 90, // Calidad de la foto
        allowEditing: false, // No permitir edición
        resultType: CameraResultType.Uri, // Obtener la foto como una URL
        source: CameraSource.Camera, // Usar la cámara del dispositivo
      });
  
      // Verifica si photo y photo.webPath existen y solo asigna si tiene un valor
      if (photo && photo.webPath) {
        this.photoUrl = photo.webPath; // Asigna la URL de la foto
        console.log('Foto tomada:', this.photoUrl);
      } else {
        console.error('No se pudo obtener la foto');
        this.showToast('No se pudo tomar la foto', 'danger');
      }
    } catch (error: unknown) {
      // Verifica que el error sea una instancia de Error
      if (error instanceof Error) {
        console.error('Error al tomar la foto:', error.message);
        if (error.name === 'User Cancelled') {
          this.showToast('La acción fue cancelada por el usuario', 'warning');
        } else {
          this.showToast('Error al tomar la foto', 'danger');
        }
      } else {
        // Si el error no es un Error, se maneja de manera genérica
        console.error('Error desconocido al tomar la foto', error);
        this.showToast('Error desconocido al tomar la foto', 'danger');
      }
    }
  }
  
}