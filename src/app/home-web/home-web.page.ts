import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/services/auth.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';


@Component({
    selector: 'app-home-web',
    templateUrl: './home-web.page.html',
    styleUrls: ['./home-web.page.scss'],
    standalone: false
})
export class HomeWebPage implements OnInit {
  Nombre: string;
  status: string;
  rol: string;
  tokenUser: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private cookieService: CookieService
  ) { }

  ngOnInit(): void {
    const token = this.cookieService.get('token');
    console.log(token)
    if (!token) {
      this.router.navigate(['']);
      return;
    }
  
    this.authService.user().subscribe(user => {
      if (user && user.user_info) { // Verificamos que user y user.user_info estén definidos
        this.rol = user.user_info.rol; // Asignamos el valor de rol correctamente
        this.tokenUser = user.token;
        console.log(this.rol);
  
        if (this.rol !== 'Admin' && this.tokenUser === "") { // Verificamos el valor de rol correctamente
          this.router.navigate(['']);
        }
      } else {
        console.error('user_info no está definido', user ? user.user_info : 'user es undefined');
        this.router.navigate(['']);
      }
    }, error => {
      console.error('Error obteniendo la información del usuario:', error);
      this.router.navigate(['']);
    });
  }
}  