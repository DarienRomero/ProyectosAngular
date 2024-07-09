import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { loginI } from '../../interfaces/login.interface';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form: FormGroup;
  email: string = '';
  password: string = '';

  constructor(
    private authService: AuthService, 
    private router: Router,
    private fb: FormBuilder,
  ) {
    this.form = this.fb.group({
      email: ['', Validators.required, Validators.email],
      password: ['', Validators.required],
    });
  }

  onLogin(forms: loginI) {
    console.log("Forms", forms)
    /* this.authService.login(this.email, this.password).then(() => {
      this.router.navigate(['/']);
    }).catch(error => {
      console.error('Login error: ', error);
    }); */
  }
}
