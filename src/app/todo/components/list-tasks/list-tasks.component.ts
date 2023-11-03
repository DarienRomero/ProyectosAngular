import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../interfaces/task';

@Component({
  selector: 'list-tasks',
  templateUrl: './list-tasks.component.html',
  styleUrls: ['./list-tasks.component.css']
})
export class ListTasksComponent {
  @Input() tasks: Task[] = [];
  @Output() onDelete = new EventEmitter<Task>();

  onDeleteHandler(task: Task){
    this.onDelete.emit(task);
  }
}
