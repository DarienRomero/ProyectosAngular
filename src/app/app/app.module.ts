import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateAppComponent } from './components/create-app/create-app.component';
import { EditAppComponent } from './components/edit-app/edit-app.component';
import { ListAppComponent } from './components/list-app/list-app.component';


@NgModule({
  declarations: [
    CreateAppComponent,
    EditAppComponent,
    ListAppComponent
  ],
  imports: [
    CommonModule
  ]
})
export class AppModule { }
