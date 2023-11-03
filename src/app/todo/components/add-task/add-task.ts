import { Component, EventEmitter, Output } from '@angular/core';
import { Task } from '../../interfaces/task';

@Component({
  selector: 'add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent {
  @Output() onAddTask = new EventEmitter<Task>(); 
  public toCreateTask: Task = {
    title: "",
    description: ""
  };
  emitTask(){
    if(!Boolean(this.toCreateTask.title)) return;
    this.onAddTask.emit(this.toCreateTask);
    this.toCreateTask = {
      title: "",
      description: ""
    };
  }
}
