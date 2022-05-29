import { Rental } from "./rental";

export class RentPaymentRequest {
  cardNumber:string;
  expireYear:string;
  expireMonth:string;
  cvc:string;
  cardHolderFullName:string;
  customerId:number;
  rental:Rental;
  amount:number;
}
