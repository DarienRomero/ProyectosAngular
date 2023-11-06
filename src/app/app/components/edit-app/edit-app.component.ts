import { Component } from '@angular/core';
import { AppApp } from '../../interfaces/app.interface';
import { AppService } from '../../services/app.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

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
    name: ""
  };
  constructor(
    private readonly appService: AppService,
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
      this.appToEdit = data.data() as AppApp;
    }, error => {

    })
  }

  editApp(){
    this.appService.updateApp(this.appToEdit).then((result) => {
      this.router.navigateByUrl("/apps")
    }).catch((err) => {
      
    });;
  }
}
