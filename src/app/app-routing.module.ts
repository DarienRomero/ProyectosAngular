import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/guards/auth.guard';

const routes: Routes = [
  {
    path: 'users',
    canActivate: [AuthGuard],
    loadChildren: () => import('./user/user.module').then( m => m.UserModule )
  },
  {
    path: 'apps',
    canActivate: [AuthGuard],
    loadChildren: () => import('./app/app.module').then( m => m.AppAppModule )
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule )
  },
  {
    path: '**',
    redirectTo: 'apps'
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
