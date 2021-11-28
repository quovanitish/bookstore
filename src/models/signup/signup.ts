export class Signup {
  name: string;
  email: string;
  password: string;

  constructor(userName: string, userEmail: string, userPassword: string) {
    this.name = userName;
    this.email = userEmail;
    this.password = userPassword;
  }
}
