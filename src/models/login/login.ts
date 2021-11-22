export class Login {
  email: string;
  password: string;

  constructor(userEmail: string, userPassword: string) {
    this.email = userEmail;
    this.password = userPassword;
  }
}
