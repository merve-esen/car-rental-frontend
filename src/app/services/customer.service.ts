import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Customer } from '../models/customer';
import { ListResponseModel } from '../models/listResponseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  apiControllerUrl = `${environment.apiUrl}/creditcards`;

  constructor(private httpClient: HttpClient) { }

  getCustomers(): Observable<ListResponseModel<Customer>> {
    let path = `${this.apiControllerUrl}/getall`
    return this.httpClient.get<ListResponseModel<Customer>>(path);
  }

  getCustomerByUserId(userId: number): Observable<SingleResponseModel<Customer>> {
    let path = `${this.apiControllerUrl}/getbyuserid?userid=${userId}`
    return this.httpClient.get<SingleResponseModel<Customer>>(path);
  }

  addCustomer(customer: Customer): Observable<SingleResponseModel<number>> {
    let path = `${this.apiControllerUrl}/add`
    return this.httpClient.post<SingleResponseModel<number>>(path, customer);
  }
}
