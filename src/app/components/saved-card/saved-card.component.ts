import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { CreditCard } from 'src/app/models/creditCard';
import { Customer } from 'src/app/models/customer';
import { CreditCardService } from 'src/app/services/credit-card.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-saved-card',
  templateUrl: './saved-card.component.html',
  styleUrls: ['./saved-card.component.css']
})
export class SavedCardComponent implements OnInit {

  creditCards: CreditCard[];
  currentUser: Customer;
  isLoggedIn: Observable<boolean>;
  @Output() selectedCard: EventEmitter<CreditCard> = new EventEmitter<CreditCard>();

  constructor(private creditCardService: CreditCardService,
    private authService: AuthService) {
  }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.loginStatus;
    this.isLoggedIn.subscribe(() => {  //if logged in
      this.getCurrentUser();
    })
  }

  getCurrentUser() {
    this.currentUser = this.authService.getUser()!;
    this.getCardsByCustomerId(this.currentUser.id);
  }

  getCardsByCustomerId(customerId: number) {
    this.creditCardService.getSavedCreditCards(customerId).subscribe(response => {
      this.creditCards = response.data;
    });
  }

  selectCard(cardId: number) {
    let selectedCard = this.creditCards.find(creditCard => creditCard.id == cardId);
    if(selectedCard){
      let newSelectedCard: CreditCard = {
        id: selectedCard.id,
        cardHolderFullName: selectedCard.cardHolderFullName,
        cardNumber: selectedCard.cardNumber,
        expireYear: selectedCard.expireYear,
        expireMonth: selectedCard.expireMonth,
        cvc: selectedCard.cvc
      };
      this.selectedCard.emit(newSelectedCard);
    }
  }

}
