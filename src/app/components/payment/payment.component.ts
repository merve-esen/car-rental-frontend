import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { CustomerService } from '../../services/customer.service';
import { RentalService } from '../../services/rental.service';
import { Rental } from 'src/app/models/rental';
import { User } from 'src/app/models/user';
import { CreditCard } from 'src/app/models/creditCard';
import { CreditCardService } from 'src/app/services/credit-card.service';
import { AuthService } from 'src/app/services/auth.service';
import { CustomerCreditCardModel } from 'src/app/models/customerCreditCardModel';
import { RentPaymentRequest } from 'src/app/models/rentPaymentRequest';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  totalPrice: number = 0;
  carId: number;
  rentedCar: Rental;
  creditCard: CreditCard;
  paymentForm: FormGroup;
  currentUser: User;
  isLoggedIn: Observable<boolean>;
  customerCreditCardModel: CustomerCreditCardModel;

  constructor(private rentalService: RentalService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService,
    private router: Router,
    private cardService: CreditCardService,
    private customerService: CustomerService,
    private authService: AuthService) {
  }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.loginStatus;
    this.isLoggedIn.subscribe(() => {  //if logged in
      this.getCurrentUser();
    })
    this.activatedRoute.params.subscribe((params) => {
      this.carId = params['carId'];
    });
    this.checkNullRentingCar();
    this.createPaymentForm();
  }

  getCurrentUser() {
    this.currentUser = this.authService.getUser()!;
  }

  createPaymentForm() {
    this.paymentForm = this.formBuilder.group({
      cardHolderFullName: ["", [Validators.required, Validators.minLength(5), Validators.maxLength(25)]],
      cardNumber: ["", [Validators.required, Validators.minLength(16), Validators.maxLength(19)]],
      expireYear: ["", [Validators.required, Validators.minLength(4), Validators.maxLength(4)]],
      expireMonth: ["", [Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
      cvc: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(3)]],
      save: [true],
      id: 0
    });
  }

  add() {
    this.rentedCar = Object.assign({}, this.rentalService.getRentingCar());

    if (this.paymentForm.invalid) {
      return this.toastrService.warning('Bilgilerinizi kontrol ediniz');
    }

    if (this.paymentForm.value.save) {
      delete this.paymentForm.value.save;
      this.creditCard = Object.assign({}, this.paymentForm.value);
      this.customerCreditCardModel = {
        creditCard: this.creditCard,
        customerId: this.currentUser.id
      }
      this.addCard(this.customerCreditCardModel);
    }

    return this.addRental(this.rentedCar);
  }

  updateCurrentCustomerFindexPoint() {
    /*let currentCustomer = this.localStorageService.getCurrentCustomer();

    this.customerService.getCustomerByEmail(currentCustomer.email).subscribe(response => {
      this.localStorageService.setCurrentCustomer(response.data);
    });*/
  }

  addRental(rental: Rental) {
    let rentRequest: RentPaymentRequest = Object.assign({}, this.paymentForm.value);
    rentRequest.customerId = this.currentUser.id;
    //rentRequest.amount = this.calculateTotalAmount();
    rentRequest.rental = rental;
    rentRequest.cardNumber = this.creditCard.cardNumber;
    rentRequest.expireYear = this.creditCard.expireYear;
    rentRequest.expireMonth = this.creditCard.expireMonth;
    rentRequest.cvc = this.creditCard.cvc;
    rentRequest.cardHolderFullName = this.creditCard.cardHolderFullName;

    this.rentalService.rent(rentRequest).subscribe(responseSuccess => {
      this.toastrService.success(responseSuccess.message, 'Başarılı');
      //this.updateCurrentCustomerFindexPoint();

      return this.router.navigate(['']);
    }, responseError => {
      console.log(responseError);
      if (responseError.error.ValidationErrors) {
        for (let i = 0; i < responseError.error.ValidationErrors.length; i++) {
          this.toastrService.error(
            responseError.error.ValidationErrors[i].ErrorMessage, 'Doğrulama Hatası'
          );
        }

        return false;
      }

      this.toastrService.error(responseError.error.message, 'Hata');
      return false;
    });
  }

  addCard(customerCreditCardModel: CustomerCreditCardModel) {
    this.cardService.saveCreditCard(customerCreditCardModel).subscribe(responseSuccess => {
      return responseSuccess.success;
    }, responseError => {
      if (responseError.error.ValidationErrors.length > 0) {
        for (let i = 0; i < responseError.error.ValidationErrors.length; i++) {
          this.toastrService.error(
            responseError.error.ValidationErrors[i].ErrorMessage, 'Doğrulama Hatası'
          );
        }

        return;
      }

      this.toastrService.error(responseError.error.Message, responseError.error.StatusCode);
      return;
    });
  }

  checkNullRentingCar() {
    if (!this.carId || this.carId == 0) {
      this.toastrService.error(
        'Araba bilgileri boş, Önce bilgileri kontrol edin', 'Hata!'
      );
      return this.router.navigate(['']);
    }

    return true;
  }

  setSelectedCard(cardOnEventing: CreditCard) {
    this.creditCard = Object.assign(cardOnEventing, { save: false });
    this.paymentForm.setValue(this.creditCard);
  }

}
