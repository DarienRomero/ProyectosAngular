import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './app-button.component.html',
  styleUrls: ['./app-button.component.css']
})
export class AppButtonComponent {
  @Input() letter: string;
  @Input() color: string;
  @Input() fontColor: string;
  @Input() large: boolean;

  @Output() childEvent = new EventEmitter<string>();

  constructor(){
    this.letter = "",
    this.color = "#262626"
    this.fontColor = "white"
    this.large = false
  }

  sendDataToParent() {
    this.childEvent.emit(this.letter);
  }
}
