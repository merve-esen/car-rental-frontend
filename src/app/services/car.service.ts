import { ListResponseModel } from '../models/listResponseModel';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { CarDetail } from '../models/carDetail';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  apiUrl = 'https://localhost:44350/api/';

  constructor(private httpClient: HttpClient) { }

  getCars():Observable<ListResponseModel<Car>> {
    let path = this.apiUrl + "cars/getall"
    return this.httpClient.get<ListResponseModel<Car>>(path);
  }

  getCarDetails():Observable<ListResponseModel<CarDetail>> {
    let path = this.apiUrl + "cars/getcardetails"
    return this.httpClient.get<ListResponseModel<CarDetail>>(path);
  }

  getCarsByBrand(brandName: string):Observable<ListResponseModel<CarDetail>> {
    let path = this.apiUrl + "cars/getcarsbybrand?brandName="+brandName
    return this.httpClient.get<ListResponseModel<CarDetail>>(path);
  }

  getCarsByColor(colorName: string):Observable<ListResponseModel<CarDetail>> {
    let path = this.apiUrl + "cars/getcarsbycolor?colorName="+colorName
    return this.httpClient.get<ListResponseModel<CarDetail>>(path);
  }

  getCarsByBrandAndColor(brandName: string, colorName: string):Observable<ListResponseModel<CarDetail>> {
    let path = this.apiUrl + "cars/getcarsbybrandandcolor?brandName="+brandName+"&colorName="+colorName
    return this.httpClient.get<ListResponseModel<CarDetail>>(path);
  }
}
