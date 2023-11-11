import { Component } from '@angular/core';
import { AppApp } from '../../interfaces/app.interface';
import { AppService } from '../../services/app.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NotifService } from 'src/app/shared/services/notif.service';

@Component({
  selector: 'edit-app',
  templateUrl: './edit-app.component.html',
  styleUrls: ['./edit-app.component.css']
})
export class EditAppComponent {
  public appToEdit: AppApp = {
    id: "",
    last_version_link: "",
    last_version_number: 0,
    last_version_string: "",
    logo: "",
    name: "",
    package_name: ""
  };
  public oldApp: AppApp = {
    id: "",
    last_version_link: "",
    last_version_number: 0,
    last_version_string: "",
    logo: "",
    name: "",
    package_name: ""
  };
  constructor(
    private readonly appService: AppService,
    private notifService: NotifService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ){

  }

  ngOnInit(): void {
    this.readCurrentApp();
  }

  readCurrentApp(){
    let id = "";
    this.activatedRoute.params.forEach((params: Params)=>{
      id = params['id']
    });
    if(!Boolean(id.length)){
      this.router.navigateByUrl('');
    }
    this.appService.getAppObs(id).subscribe(data => {
      this.oldApp = data.data() as AppApp;
      this.appToEdit = data.data() as AppApp;
    }, error => {

    })
  }

  editApp(){
    if(this.appToEdit.last_version_number > this.oldApp.last_version_number){
      this.notifService.sendNotificationToTopic(this.appToEdit);
    }
    this.notifService.sendNotificationToTopic(this.appToEdit);
    this.appService.updateApp(this.appToEdit).then((result) => {
      this.router.navigateByUrl("/apps")
    }).catch((err) => {
      
    });
  }
}
