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

  onSubmit = (signupObject: SignupComponent): void => {
    console.log(signupObject);
  };
}
