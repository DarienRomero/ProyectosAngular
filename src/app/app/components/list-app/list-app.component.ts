import { Component } from '@angular/core';
import { AppService } from '../../services/app.service';
import { AppApp } from '../../interfaces/app.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IClipboardResponse } from 'ngx-clipboard';

@Component({
  selector: 'list-app',
  templateUrl: './list-app.component.html',
  styleUrls: ['./list-app.component.css']
})
export class ListAppComponent {
  constructor(
    private readonly appService: AppService,
    private snackBar: MatSnackBar
  ){

  }

  get apps(){
    return this.appService.apps;
  }

  deleteApp(app: AppApp){
    this.appService.deleteApp(app);
  }
  onCopyToClipboard(data: IClipboardResponse){
    console.log("onCopyToClipboard")
    this.snackBar.open("Copiado al portapapeles", "Cerrar", {
      duration: 3000
    });
  }
}
