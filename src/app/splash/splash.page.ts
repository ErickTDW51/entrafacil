import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
})
export class SplashPage implements OnInit {
  constructor(private navCtrl: NavController) {}

  ngOnInit() {
    setTimeout(() => {
      // Navegación sin animación
      this.navCtrl.navigateRoot('/login', { animated: false });
    }, 3000);
  }
}
