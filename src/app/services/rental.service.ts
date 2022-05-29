import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { RentalDetail } from '../models/rentalDetail';
import { environment } from 'src/environments/environment';
import { Rental } from '../models/rental';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { RentPaymentRequest } from '../models/rentPaymentRequest';

@Injectable()
export class RentalService {

  apiControllerUrl = `${environment.apiUrl}/rentals`;
  rentingCar: Rental;

  constructor(private httpClient: HttpClient) { }

  getRentals(): Observable<ListResponseModel<Rental>> {
    return this.httpClient.get<ListResponseModel<Rental>>(
      `${this.apiControllerUrl}/getall`
    );
  }

  getRentalDetails(): Observable<ListResponseModel<RentalDetail>> {
    return this.httpClient.get<ListResponseModel<RentalDetail>>(`${this.apiControllerUrl}/getrentaldetails`);
  }

  isRentable(rental: Rental): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      `${this.apiControllerUrl}/isrentable`,
      rental
    );
  }

  add(rental: Rental): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      `${this.apiControllerUrl}/add`,
      rental
    );
  }

  setRentingCar(rental: Rental) {
    this.rentingCar = rental;
  }

  getRentingCar() {
    return this.rentingCar;
  }

  rent(rentRequest:RentPaymentRequest):Observable<SingleResponseModel<number>>{
    let newPath = `${this.apiControllerUrl}/rent`;
    return this.httpClient.post<SingleResponseModel<number>>(newPath,rentRequest);
  }

}
