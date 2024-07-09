import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  constructor(
    private authService: AuthService,
    private router: Router,
  ){

  }

  onSignOut(){
    console.log('Sign Out');
    this.authService.signOut().then(() => {
      this.router.navigateByUrl("/auth")
    })
  }

}
