import { Component, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'calculadora-app';
  content: string; 

  constructor(){
    this.content = ""
  }

  handleChildEvent(event: MouseEvent | string) {
    this.content += event;
  }
  helloWorld(){
    console.log("helloWorld")
  }
}
