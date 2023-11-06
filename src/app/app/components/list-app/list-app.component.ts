import { Component } from '@angular/core';
import { AppService } from '../../services/app.service';
import { AppApp } from '../../interfaces/app.interface';

@Component({
  selector: 'list-app',
  templateUrl: './list-app.component.html',
  styleUrls: ['./list-app.component.css']
})
export class ListAppComponent {
  constructor(
    private readonly appService: AppService
  ){

  }

  get apps(){
    return this.appService.apps;
  }

  deleteApp(app: AppApp){
    this.appService.deleteApp(app);
  }
}
