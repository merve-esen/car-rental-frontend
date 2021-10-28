import { ListResponseModel } from '../models/listResponseModel';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Color } from '../models/color';
import { environment } from 'src/environments/environment';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  apiControllerUrl = `${environment.apiUrl}/colors`;

  constructor(private httpClient: HttpClient) { }

  getColors():Observable<ListResponseModel<Color>> {
    let path = `${this.apiControllerUrl}/getall`
    return this.httpClient.get<ListResponseModel<Color>>(path);
  }

  getById(id: number):Observable<SingleResponseModel<Color>> {
    let path = `${this.apiControllerUrl}/getbyid?id=${id}`
    return this.httpClient.get<SingleResponseModel<Color>>(path);
  }
}
