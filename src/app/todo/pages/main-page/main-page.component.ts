import { Component } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { Task } from '../../interfaces/task';

@Component({
  selector: 'main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent {
  constructor(
    private todoService: TodoService
  ){
  
  }

  get tasks(): Task[] {
    return this.todoService.tasks;
  }

  onAddTask(task: Task){

  }

  onDeleteTask( task: Task ) {
    this.todoService.deleteTask( task );
  }
}
