import { ListResponseModel } from '../models/listResponseModel';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { CarDetail } from '../models/carDetail';
import { environment } from 'src/environments/environment';
import { SingleResponseModel } from '../models/singleResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable()
export class CarService {

  apiControllerUrl = `${environment.apiUrl}/cars`;

  constructor(private httpClient: HttpClient) { }

  getCars():Observable<ListResponseModel<Car>> {
    let path = `${this.apiControllerUrl}/getall`
    return this.httpClient.get<ListResponseModel<Car>>(path);
  }

  getCarDetails():Observable<ListResponseModel<CarDetail>> {
    let path = `${this.apiControllerUrl}/getcardetails`
    return this.httpClient.get<ListResponseModel<CarDetail>>(path);
  }

  getById(id: number):Observable<SingleResponseModel<Car>> {
    let path = `${this.apiControllerUrl}/getbyid?id=${id}`
    return this.httpClient.get<SingleResponseModel<Car>>(path);
  }

  getCarDetailByCarId(carId: number):Observable<SingleResponseModel<CarDetail>> {
    let path = `${this.apiControllerUrl}/getcardetailbycarid?carId=${carId}`
    return this.httpClient.get<SingleResponseModel<CarDetail>>(path);
  }

  getCarsByBrand(brandName: string):Observable<ListResponseModel<CarDetail>> {
    let path = `${this.apiControllerUrl}/getcarsbybrand?brandName=${brandName}`
    return this.httpClient.get<ListResponseModel<CarDetail>>(path);
  }

  getCarsByColor(colorName: string):Observable<ListResponseModel<CarDetail>> {
    let path = `${this.apiControllerUrl}/getcarsbycolor?colorName=${colorName}`
    return this.httpClient.get<ListResponseModel<CarDetail>>(path);
  }

  getCarsByBrandAndColor(brandName: string, colorName: string):Observable<ListResponseModel<CarDetail>> {
    let path = `${this.apiControllerUrl}/getcarsbybrandandcolor?brandName=${brandName}&colorName=${colorName}`
    return this.httpClient.get<ListResponseModel<CarDetail>>(path);
  }

  add(car:Car):Observable<ResponseModel>{
    let path = `${this.apiControllerUrl}/add`
    return this.httpClient.post<ResponseModel>(path,car)
  }

  update(car:Car):Observable<ResponseModel>{
    let path = `${this.apiControllerUrl}/update`
    return this.httpClient.post<ResponseModel>(path,car)
  }

  delete(car:Car):Observable<ResponseModel>{
    let path = `${this.apiControllerUrl}/delete`
    return this.httpClient.post<ResponseModel>(path,car)
  }
}
