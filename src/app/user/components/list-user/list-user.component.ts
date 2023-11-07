import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AppUser } from '../../interfaces/user.interface';

@Component({
  selector: 'list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent {
  constructor(
    private readonly userService: UserService
  ){

  }

  get users(){
    return this.userService.users;
  }

  get onlyActiveUsers(){
    return this.userService.onlyActiveUsers;
  }

  onChangeUserEnabledStatus(user: AppUser){
    this.userService.updateUser({
      ...user,
      enabled: !user.enabled
    })
  }
  onChangeOnlyActiveUsers(){
    this.userService.onChangeOnlyActiveUsers();
  }
  deleteUser(user: AppUser){
    this.userService.deleteUser(user);
  }
}
