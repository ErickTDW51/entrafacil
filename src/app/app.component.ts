import { Component } from '@angular/core';
import { Platform } from '@ionic/angular'; // Importar Platform
import { Router } from '@angular/router'; // Importar Router

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'],
    standalone: false
})
export class AppComponent {
  constructor(
    private platform: Platform, // Inyectar Platform
    private router: Router // Inyectar Router
  ) {
    this.iniciarApp();
  }

  iniciarApp() {
    this.platform.ready().then(() => { // Cambiar redy() por ready()
      this.router.navigateByUrl('splash'); // Usar router en lugar de route
    });
  }
}
