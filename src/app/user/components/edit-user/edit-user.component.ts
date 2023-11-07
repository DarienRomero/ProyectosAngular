import { Component, SimpleChanges } from '@angular/core';
import { AppUser } from '../../interfaces/user.interface';
import { AppService } from '../../../app/services/app.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UserService } from '../../services/user.service';

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
    apps_enabled: []
  };
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

  ngOnInit(): void {
    this.readCurrentUser();
  }

  readCurrentUser(){
    let id = "";
    this.activatedRoute.params.forEach((params: Params)=>{
      id = params['id']
    });
    if(!Boolean(id.length)){
      this.router.navigateByUrl('');
    }
    this.userService.getUserObs(id).subscribe(data => {
      this.userToEdit = data.data() as AppUser;
    }, error => {

    })
  }

  onChangeSelectedApp(appId: string){
    const included = this.userToEdit.apps_enabled.includes(appId);
    if(included){
      this.userToEdit.apps_enabled = this.userToEdit.apps_enabled.filter(e => e != appId);
    }else{
      this.userToEdit.apps_enabled.push(appId);
    }
    console.log("new user", this.userToEdit);
  }

  editUser(){
    this.userService.updateUser(this.userToEdit).then((result) => {
      this.router.navigateByUrl("/users")
    }).catch((err) => {
      
    });;
  }
}
