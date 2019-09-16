import {User} from './user.model';
import {AuthData} from './auth-data.model';
import {Subject} from 'rxjs';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

@Injectable()
export class AuthService {

  private user: User;
  public authChange = new Subject<boolean>();

  constructor(
    private router: Router
  ) {}

  registerUser( authData: AuthData ) {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 1000 ).toString()
    };
    this.successfulAuthentication();
  }

  login( authData: AuthData ) {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 1000 ).toString()
    };
    this.successfulAuthentication();
  }

  logout() {
    this.user = null;
    this.authChange.next(false);
    this.router.navigate( ['/login'] );
  }

  getUser() {
    return { ...this.user };
  }

  isAuth() {
    return this.user != null;
  }

  successfulAuthentication() {
    this.authChange.next(true);
    this.router.navigate( ['/training'] );
  }

}
