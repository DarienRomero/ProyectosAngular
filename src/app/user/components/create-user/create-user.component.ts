import { Component } from '@angular/core';
import { AppUser } from '../../interfaces/user.interface';
import { AppService } from 'src/app/app/services/app.service';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent {
  public userToCreate: AppUser = {
    email:        "",
    enabled:      true,
    id:           "",
    username:     "",
    apps_enabled: []
  };
  public password = "";
  constructor(
    private readonly appService: AppService,
    private readonly userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ){

  }

  get apps(){
    return this.appService.apps
  }

  onChangeSelectedApp(appId: string){
    const included = this.userToCreate.apps_enabled.includes(appId);
    if(included){
      this.userToCreate.apps_enabled = this.userToCreate.apps_enabled.filter(e => e != appId);
    }else{
      this.userToCreate.apps_enabled.push(appId);
    }
    console.log("new user", this.userToCreate);
  }

  async createUser() {
    try {
      await this.userService.createUser(this.userToCreate, this.password);
      this.router.navigateByUrl("/users")
    } catch (error) {
      this.router.navigateByUrl("/users")
    }
  }
}
