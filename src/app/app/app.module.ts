import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateAppComponent } from './components/create-app/create-app.component';
import { EditAppComponent } from './components/edit-app/edit-app.component';
import { ListAppComponent } from './components/list-app/list-app.component';
import { AppHomeComponent } from './pages/app-home/app-home.component';
import { AppAppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CreateAppComponent,
    EditAppComponent,
    ListAppComponent,
    AppHomeComponent
  ],
  imports: [
    CommonModule,
    AppAppRoutingModule,
    FormsModule
  ]
})
export class AppAppModule { }
