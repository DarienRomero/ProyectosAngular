import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from './auth/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'apk_manager';
  showSidebar: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    authService.accessSubject.subscribe(access => {
      if(!access){
        Swal.fire({
          position: 'center',
          icon: 'error',
          text: 'No tienes permisos para acceder a esta aplicación',
          showConfirmButton: false,
          timer: 5000
        });
        this.authService.signOut().then(() => {
          router.navigate(['/auth']);
        })
      }
    });
  }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        console.log("Event", event)
        this.showSidebar = event.url !== '/auth';
      }
    });
  }
}
