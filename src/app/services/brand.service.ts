import { ListResponseModel } from '../models/listResponseModel';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Brand } from '../models/brand';
import { environment } from 'src/environments/environment';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  apiControllerUrl = `${environment.apiUrl}/brands`;

  constructor(private httpClient: HttpClient) { }

  getBrands():Observable<ListResponseModel<Brand>> {
    let path = `${this.apiControllerUrl}/getall`
    return this.httpClient.get<ListResponseModel<Brand>>(path);
  }

  getById(id: number):Observable<SingleResponseModel<Brand>> {
    let path = `${this.apiControllerUrl}/getbyid?id=${id}`
    return this.httpClient.get<SingleResponseModel<Brand>>(path);
  }
}
