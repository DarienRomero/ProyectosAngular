import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddTaskComponent } from './components/add-task/add-task';
import { ListTasksComponent } from './components/list-tasks/list-tasks.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AddTaskComponent,
    ListTasksComponent,
    MainPageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
  ],
  exports: [
    MainPageComponent
  ]
})
export class TodoModule { }
