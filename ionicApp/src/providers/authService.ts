export class AuthService {

  user: any;
  isLogged: boolean;

  constructor() {
    this.isLogged = false;
  }

  public setUser(user) {
    this.user = user;
    if(user.token) {
      this.isLogged = true;
    }
  }

  public authenticated() {
    return this.isLogged;
  }
}
