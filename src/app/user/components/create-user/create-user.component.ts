import { Component } from '@angular/core';
import { AppUser } from '../../interfaces/user.interface';
import { AppService } from 'src/app/app/services/app.service';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { RoleService } from '../../services/role.service';

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
    apps_enabled: [],
    role: ""
  };
  public password = "";
  constructor(
    private readonly appService: AppService,
    private readonly userService: UserService,
    private readonly roleService: RoleService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ){

  }

  ngOnInit(): void {
    this.appService.readAllApps();
    this.roleService.getRoles();
  }

  get apps(){
    return this.appService.apps
  }

  get allApps(){
    return this.appService.allApps
  }

  get allAppsLoading(){
    return this.appService.allAppsLoading
  }

  get roles(){
    return this.roleService.roles
  }
  get loadingRoles(){
    return this.roleService.loadingRoles
  }

  onChangeSelectedApp(appId: string){
    const included = this.userToCreate.apps_enabled.includes(appId);
    if(included){
      this.userToCreate.apps_enabled = this.userToCreate.apps_enabled.filter(e => e != appId);
    }else{
      this.userToCreate.apps_enabled.push(appId);
    }
  }

  async createUser() {
    try {
      await this.userService.createUser(this.userToCreate, this.password);
      Swal.fire({
        position: 'center',
        icon: 'success',
        text: 'Se creó correctamente',
        showConfirmButton: false,
        timer: 5000
      });
      this.router.navigateByUrl("/users")
    } catch (error) {
      this.router.navigateByUrl("/users")
    }
  }
}
