import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AppUser } from '../../interfaces/user.interface';
import { IClipboardResponse } from 'ngx-clipboard';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';

@Component({
  selector: 'list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent {
  constructor(
    private readonly userService: UserService,
    private snackBar: MatSnackBar
  ){
  }

  ngOnInit(){
    this.userService.onStart();
  }

  ngOnDestroy(){
    this.userService.onReset();
  }

  get page(){
    return this.userService.page;
  }
  get perPage(){
    return this.userService.perPage;
  }

  get disabledNext(){
    return this.users.length < this.userService.perPage;
  }
  get loadingUsers(){
    return this.userService.loadingUsers;
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
  onResendEmail(user: AppUser){
    this.userService.changePassword(user.email).then(() => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        text: 'Se envió el correo correctamente',
        showConfirmButton: false,
        timer: 5000
      });
    })
  }
  onCopyToClipboard(data: IClipboardResponse){
    this.snackBar.open("Copiado al portapapeles", "Cerrar", {
      duration: 3000
    });
  }
  previousPage(){
    this.userService.onPreviousPage()
  }
  nextPage(){
    this.userService.onNextPage()
  }
}
