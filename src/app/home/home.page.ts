import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../core/auth.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit{
  id_usuario:string;
  rol: any;
  tokenUser: any;
  nombre:string;

  photoUrl: string = '';
  private esp32Ip = 'http://0.0.0.0'; // Cambia esta IP por la del ESP32
  apellidoP: any;
  constructor( 
    private navCtrl: NavController,
    private toastCtrl: ToastController,
   private alertController: AlertController,
   private fb: FormBuilder, 
   private authService:AuthService, 
   private cookieService: CookieService, 
   private router:Router // Inyecta el controlador de alertas
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
  
  ngOnInit(): void { 
    const token = this.cookieService.get('token'); 
    if (!token) { this.router.navigate(['']); 
      return; 
    }
    this.id_usuario = this.cookieService.get('id_usuario');

    this.authService.user(this.id_usuario).subscribe(response =>{
        console.log('Response from API:', response);

      if (Array.isArray(response) && response.length > 0) { 
        const user = response[0];

        this.rol = user.rol; // Asignamos el valor de rol correctamente
        this.tokenUser = user.token;
        this.nombre = user.nombre;
        this.apellidoP =  user.apellidoP;
        console.log(this.nombre);
        
        if (this.rol !== 'Admin' &&  this.tokenUser === "") { // Verificamos el valor de rol correctamente
          this.router.navigate(['']);
        }
      } else {
        console.error('user_info no está definido');
        this.router.navigate(['']);
      }
    }, error => {
      console.error('Error obteniendo la información del usuario:', error);
      this.router.navigate(['']);
    });
  }
}