import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
