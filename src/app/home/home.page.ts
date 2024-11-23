import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { AuthService } from '../core/services/auth.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit{
  Nombre: string;
  status: string;
  rol: string;
  tokenUser: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private cookieService: CookieService,
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

  ngOnInit(): void {
    const token = this.cookieService.get('token');
    if (!token) {
      this.router.navigate(['']);
      return;
    }
    this.authService.user().subscribe(user => {
      if (user && user.user_info) {
        this.rol = user.user_info.rol; // Asignamos el valor de rol correctamente
        this.tokenUser = user.user_info.token;
        console.log(this.rol);
        
        if (this.rol !== 'Usuario' &&  this.tokenUser === "") { // Verificamos el valor de rol correctamente
          this.router.navigate(['']);
        }
      } else {
        console.error('user_info no está definido', user.user_info);
        
        this.router.navigate(['']);
      }
    }, error => {
      console.error('Error obteniendo la información del usuario:', error);
      this.router.navigate(['']);
    });
  }
}
