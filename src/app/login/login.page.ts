import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/core/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  authForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService:AuthService,
    private cookieService: CookieService,
    private router:Router,
    private NavCtrl: NavController
  ){}
  
  Entrar(form: FormGroup) {
    if (form.valid) {
      this.authService.login(form.value.usuario, form.value.password).subscribe(data=>{
        console.log(data)
        if (data.status == 'success') { 
          this.cookieService.set('token', data.token);
          if(data.user_info.rol == 'admin'){
            this.router.navigate(['/home-web']);
          }else if (data.user_info.rol == 'usuario'){
            this.router.navigate(['/home']);
          }else{
            alert('Usuario o contraseña incorrecta.')
          }
        }
      });
      // Lógica para manejar el formulario enviado
    } else {
      console.log('Formulario no válido');
    }
  }

  ngOnInit() {
    this.authForm = this.fb.group({
      usuario: ['', Validators.required],
      password: ['', [
        Validators.required,
        Validators.minLength(8)
      ]]
    });
  }

}
