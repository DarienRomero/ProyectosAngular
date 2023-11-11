import { Component } from '@angular/core';
import { AppApp } from '../../interfaces/app.interface';
import { AppService } from '../../services/app.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'create-app',
  templateUrl: './create-app.component.html',
  styleUrls: ['./create-app.component.css']
})
export class CreateAppComponent {
  public appToCreate: AppApp = {
    id: "",
    last_version_link: "",
    last_version_number: 0,
    last_version_string: "",
    logo: "",
    name: "",
    package_name: ""
  };
  public password = "";
  constructor(
    private readonly appService: AppService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ){

  }

  async onCreateApp() {
    try {
      await this.appService.createApp(this.appToCreate);
      this.router.navigateByUrl("/apps")
    } catch (error) {
      this.router.navigateByUrl("/apps")
    }
  }
}
