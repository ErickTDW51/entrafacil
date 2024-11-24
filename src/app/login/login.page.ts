import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  authForm: FormGroup;

  constructor(private fb: FormBuilder, private authService:AuthService, private cookieService: CookieService, private router:Router) { }
  ngOnInit() {
    this.authForm = this.fb.group({
      usuario: ['', Validators.required],
      password: ['', [
        Validators.required,
        Validators.minLength(8)
      ]]
    });
  }

  Entrar(form: FormGroup) {
    if (form.valid) {
      this.authService.login(form.value.usuario, form.value.password).subscribe(data=>{
        console.log(data)
        if (data.status == 'success') { 
          this.cookieService.set('token', data.token);
          if(data.user_info.rol == 'admin'){
            this.router.navigate(['/home-web']);
          }else{
            this.router.navigate(['/home']);
          }
        }
      });
      // Lógica para manejar el formulario enviado
    } else {
      console.log('Formulario no válido');
    }
  }
}
