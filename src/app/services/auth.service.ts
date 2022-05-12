import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TokenModel } from '../models/tokenModel';
import { LoginModel } from './../models/loginModel';
import { RegisterModel } from './../models/registerModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { BehaviorSubject, Observable } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../models/user';

@Injectable()
export class AuthService {
  apiControllerUrl = `${environment.apiUrl}/auth`;
  private loggedIn = new BehaviorSubject<boolean>(this.isTokenExpired()); //https://loiane.com/2017/08/angular-hide-navbar-login-page/

  public get loginStatus() {
    return this.loggedIn.asObservable();
  }

  public get isLoggedIn() {
    return this.loggedIn.getValue();
  }

  public set isLoggedIn(status: boolean) {
    this.loggedIn.next(status);
  }

  constructor(
    private httpClient: HttpClient,
    private localStorageService: LocalStorageService,
    private jwtHelperService: JwtHelperService
  ) {}

  login(loginModel: LoginModel): Observable<SingleResponseModel<TokenModel>> {
    let path = `${this.apiControllerUrl}/login`;
    return this.httpClient.post<SingleResponseModel<TokenModel>>(path, loginModel);
  }

  logOut() {
    this.localStorageService.remove("token");
    this.loggedIn.next(false);
  }

  register(registerModel: RegisterModel): Observable<SingleResponseModel<TokenModel>> {
    let path = `${this.apiControllerUrl}/register`;
    return this.httpClient.post<SingleResponseModel<TokenModel>>(path, registerModel);
  }

  /*isAuthenticated() {
    if (localStorage.getItem('token')) {
      return true;
    } else {
      return false;
    }
  }*/

  private isTokenExpired(): boolean {
    let token = this.getToken();
    if (token != null) {
      return !this.jwtHelperService.isTokenExpired(token);
    }
    return false;
  }

  private getToken(): string | null {
    return this.localStorageService.getItem('token');
  }

  getUser(): User | undefined {
    let token = this.getToken();
    if (token != null) {
      let tokenDetails = Object.entries(this.jwtHelperService.decodeToken(token));
      let user: User = new User;
      tokenDetails.forEach(detail => {
        switch (detail[0]) {
          case "email": {
            user.email = String(detail[1]);
            break;
          }
          case "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name": {
            user.name = String(detail[1]);
            break;
          }
          case "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": {
            user.roles = detail[1] as Array<string>
            break;
          }
          case "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier": {
            user.id = Number(detail[1]);
          }
        }
      });
      if (!user.roles) {  //if the user does not have a role
        user.roles = [];
      }
      return user;
    }
    return undefined;
  }

  hasRole(user: User, role: string): boolean {
    if (user.roles.indexOf(role) !== -1) {
      return true;
    }
    return false;
  }
}
