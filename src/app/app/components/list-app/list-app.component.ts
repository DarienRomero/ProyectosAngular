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

  ngOnInit(){
    this.appService.onStart();
  }

  ngOnDestroy(){
    this.appService.onReset();
  }

  get page(){
    return this.appService.page;
  }

  get disabledNext(){
    return this.apps.length < this.appService.perPage;
  }
  get loadingApps(){
    return this.appService.loadingApps;
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
  previousPage(){
    this.appService.onPreviousPage()
  }
  nextPage(){
    this.appService.onNextPage()
  }
  
}
