import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeWebPage } from './home-web.page';

const routes: Routes = [
  {
    path: 'home-web',
    component: HomeWebPage,
    children:[
      {
        path:'registro',
        loadChildren: () => import('../registro/registro.module').then( m => m.RegistroPageModule)
      },
      {
        path:'controladmin',
        loadChildren: () => import('../controladmin/controladmin.module').then( m => m.ControladminPageModule)
      },
      {
        path:'crearperfil',
        loadChildren: () => import('../crearperfil/crearperfil.module').then( m => m.CrearperfilPageModule)
      },
      {
        path: '',
        redirectTo: 'home-web/registro',
        pathMatch: 'full'
      }
      
    ]
  },
  {
    path: '',
    redirectTo: 'home-web/registro',
    pathMatch: 'full'
  }
    
  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeWebPageRoutingModule {}
