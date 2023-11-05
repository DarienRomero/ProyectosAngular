import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserHomeComponent } from './user/pages/user-home/user-home.component';
import { AppHomeComponent } from './app/pages/app-home/app-home.component';

const routes: Routes = [
  {
    path: 'users',
    loadChildren: () => import('./user/user.module').then( m => m.UserModule )
  },
  {
    path: 'apps',
    loadChildren: () => import('./app/app.module').then( m => m.AppAppModule )
  },
  {
    path: '**',
    redirectTo: 'users'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot( routes ),
  ],
  exports: [
    RouterModule,
  ]
})
export class AppRoutingModule { }
