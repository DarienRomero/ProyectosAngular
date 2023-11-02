import { Component } from '@angular/core';
import { Task } from '../../interfaces/task';

@Component({
  selector: 'list-tasks',
  templateUrl: './list-tasks.component.html',
  styleUrls: ['./list-tasks.component.css']
})
export class ListTasksComponent {
  public tasks: Task[] = [
    {
      id: "1",
      title: "Primera tarea",
      description: "Esta es la primera tarea"
    },
    {
      id: "2",
      title: "Segunda tarea",
      description: "Esta es la segunda tarea"
    },
    {
      id: "3",
      title: "Tercera tarea",
      description: "Esta es la tercera tarea"
    },
]
}
