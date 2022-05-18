import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CreditCard } from '../models/creditCard';
import { ListResponseModel } from '../models/listResponseModel';
import { CustomerCreditCardModel } from '../models/customerCreditCardModel';

@Injectable({
  providedIn: 'root'
})
export class CreditCardService {

  apiControllerUrl = `${environment.apiUrl}/creditcards`;

  constructor(private httpClient: HttpClient) { }

  getSavedCreditCards(customerId: number): Observable<ListResponseModel<CreditCard>> {
    let path = `${this.apiControllerUrl}/getcreditcardsbycustomerid`
    return this.httpClient.post<ListResponseModel<CreditCard>>(path, customerId);
  }

  saveCreditCard(customerCreditCardModel: CustomerCreditCardModel) {
    let path = `${this.apiControllerUrl}/savecreditcard`
    return this.httpClient.post<ListResponseModel<CreditCard>>(path, customerCreditCardModel);
  }

  deleteCreditCard(customerCreditCardModel: CustomerCreditCardModel) {
    let path = `${this.apiControllerUrl}/deletecreditcard`
    return this.httpClient.post<ListResponseModel<CreditCard>>(path, customerCreditCardModel);
  }

}
