import { Component } from '@angular/core';
import { AppUser } from '../../interfaces/user.interface';
import { AppService } from '../../../app/services/app.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';
import { RoleService } from '../../services/role.service';

@Component({
  selector: 'edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent {
  public userToEdit: AppUser = {
    email:        "",
    enabled:      false,
    id:           "",
    username:     "",
    apps_enabled: [],
    role: ""
  };
  
  constructor(
    private readonly appService: AppService,
    private readonly userService: UserService,
    private readonly roleService: RoleService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ){
  }

  get apps(){
    return this.appService.apps
  }

  get allAps(){
    return this.appService.allApps
  }
  get allAppsLoading(){
    return this.appService.allAppsLoading
  }

  public loadingUser = false;

  ngOnInit(): void {
    this.readCurrentUser();
    this.roleService.getRoles();
    this.appService.readAllApps();
  }

  get roles(){
    return this.roleService.roles
  }

  readCurrentUser(){
    let id = "";
    this.activatedRoute.params.forEach((params: Params)=>{
      id = params['id']
    });
    if(!Boolean(id.length)){
      this.router.navigateByUrl('');
    }
    this.loadingUser = true;
    this.userService.getUserObs(id).subscribe({
      next: (data) => {
        this.loadingUser = false;
        this.userToEdit = data.data() as AppUser;
        console.log("this.userToEdit", this.userToEdit)
      },
      error: (error) => {
        this.loadingUser = false;
        Swal.fire({
          title: 'Ocurrió un error!',
          text: 'El usuario no pudo ser cargado',
          icon: 'error',
          confirmButtonText: 'Cool',
          timer: 10000
        })    
      }
    })
  }

  onChangeSelectedApp(appId: string){
    const included = this.userToEdit.apps_enabled.includes(appId);
    if(included){
      this.userToEdit.apps_enabled = this.userToEdit.apps_enabled.filter(e => e != appId);
    }else{
      this.userToEdit.apps_enabled.push(appId);
    }
  }

  editUser(){
    this.userService.updateUser(this.userToEdit).then((result) => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        text: 'Se actualizó correctamente',
        showConfirmButton: false,
        timer: 5000
      });
      this.router.navigateByUrl("/users")
    }).catch((err) => {
      
    });
  }
}
