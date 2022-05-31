import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponseModel } from '../models/responseModel';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiControllerUrl = `${environment.apiUrl}/users`;

  constructor(private httpClient: HttpClient) { }

  updateProfile(user: User): Observable<ResponseModel> {
    let path = `${this.apiControllerUrl}/updateprofile`;
    return this.httpClient.post<ResponseModel>(path, user);
  }
}
