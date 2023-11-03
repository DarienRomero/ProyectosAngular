import { Injectable } from "@angular/core";
import { Task } from "../interfaces/task";

@Injectable({
    providedIn: 'root'
})
export class TodoService {
    public tasks : Task[];
    constructor(){
        this.tasks = [
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
        ];
    }

    addTask(task: Task){
        this.tasks.push(task);
    }
    
    deleteTask(task: Task){
        this.tasks = this.tasks.filter(e => e.id !== task.id)
    }
}