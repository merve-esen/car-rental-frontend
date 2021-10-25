import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { RentalDetail } from '../models/rentalDetail';

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  apiUrl = 'https://localhost:44350/api/rentals/';

  constructor(private httpClient: HttpClient) { }

  getRentalDetails():Observable<ListResponseModel<RentalDetail>> {
    return this.httpClient.get<ListResponseModel<RentalDetail>>(this.apiUrl + "getrentaldetails");
  }
}
