import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListUserComponent } from './components/list-user/list-user.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { UserHomeComponent } from './pages/user-home/user-home.component';
import { UserRoutingModule } from './user-routing.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    ListUserComponent,
    EditUserComponent,
    CreateUserComponent,
    UserHomeComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    RouterModule
  ],
  exports: [
    UserHomeComponent,
  ]
})
export class UserModule { }
