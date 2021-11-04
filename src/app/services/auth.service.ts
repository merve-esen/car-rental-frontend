import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TokenModel } from '../models/tokenModel';
import { LoginModel } from './../models/loginModel';
import { RegisterModel } from './../models/registerModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiControllerUrl = `${environment.apiUrl}/auth`;

  constructor(private httpClient: HttpClient) {}

  login(loginModel: LoginModel): Observable<SingleResponseModel<TokenModel>> {
    let path = `${this.apiControllerUrl}/login`;
    return this.httpClient.post<SingleResponseModel<TokenModel>>(path, loginModel);
  }

  register(registerModel: RegisterModel): Observable<SingleResponseModel<TokenModel>> {
    let path = `${this.apiControllerUrl}/register`;
    return this.httpClient.post<SingleResponseModel<TokenModel>>(path, registerModel);
  }

  isAuthenticated() {
    if (localStorage.getItem('token')) {
      return true;
    }
    else{
      return false;
    }
  }
}
