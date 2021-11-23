import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { environment } from 'src/environments/environment';
import { Login } from 'src/models/login/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  user = new Login('', '');

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate([environment.ui.bookstore]);
    }
  }

  // event handler for form submit
  onSubmit(userLoginObj: Login) {
    this.authService.login(userLoginObj).subscribe(
      (response) => {
        localStorage.setItem('token', response.token);
        this.router.navigate([environment.ui.bookstore]);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
