import { Component } from '@angular/core';
import { User } from '../../interfaces/user.interface';
import { AppService } from '../../../app/services/app.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent {
  constructor(
    private readonly appService: AppService,
    private readonly userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ){

  }
  get userToEdit(){
    console.log("this.userService.userToEdit", this.userService.userToEdit)
    return this.userService.userToEdit;
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
    console.log("Id froms params", id)
    if(!Boolean(id.length)){
      this.router.navigateByUrl('');
    }
    console.log("Edited user id: ", id)
    this.userService.getUser(id)
  }

  public toEditUser: User = {
    email:        "",
    enabled:      false,
    id:           "",
    username:     "",
    apps_enabled: []
  };
  editUser(){

  }
}
