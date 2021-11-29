import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { environment } from 'src/environments/environment';
import { Signup } from 'src/models/signup/signup';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  newUser = new Signup('', '', '');

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate([environment.ui.bookstore]);
    }
  }

  // event handler for form submit
  onSubmit = (signupObject: Signup): void => {
    this.authService.signup(signupObject).subscribe(
      (response) => {
        localStorage.setItem('token', response.token);
        this.router.navigate([environment.ui.bookstore]);
      },
      (error) => {
        console.log(error);
      }
    );
  };
}
