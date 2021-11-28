import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthService } from './services/auth/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private router: Router, public authService: AuthService) {}

  handleCartClick = (): void => {
    this.router.navigate([environment.ui.cart]);
  };

  handleLoginClick = (): void => {
    this.router.navigate([environment.ui.login]);
  };

  handleSignUpClick = (): void => {
    this.router.navigate([environment.ui.signup]);
  };

  handleLogOutClick = (): void => {
    this.authService.logout().subscribe(
      (response) => {
        console.log('Logout Success');
        localStorage.removeItem('token');
        this.router.navigate([environment.ui.bookstore]);
      },
      (error) => {
        console.log(error);
      }
    );
  };
}
