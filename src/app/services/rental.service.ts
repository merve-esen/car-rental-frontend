import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RentalDetailResponseModel } from '../models/rentalDetailResponseModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  apiUrl = 'https://localhost:44350/api/rentals/';

  constructor(private httpClient: HttpClient) { }

  getRentalDetails():Observable<RentalDetailResponseModel> {
    return this.httpClient.get<RentalDetailResponseModel>(this.apiUrl + "getrentaldetails");
  }
}
