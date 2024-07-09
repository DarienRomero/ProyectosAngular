import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { loginI } from '../../interfaces/login.interface';
import { AuthService } from '../../auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(
    private authService: AuthService, 
    private router: Router,
  ) {
  }

  onLogin() {
    this.authService.login(this.email, this.password).then((value) => {
      console.log("Value", value)
      this.router.navigate(['/']);
    }).catch(error => {
      Swal.fire({
        position: 'center',
        icon: 'error',
        text: error.message,
        showConfirmButton: false,
        timer: 5000
      });
    });
  }
}
