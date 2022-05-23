import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Rental } from 'src/app/models/rental';
import { User } from 'src/app/models/user';
import { RentalService } from 'src/app/services/rental.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-car-rent',
  templateUrl: './car-rent.component.html',
  styleUrls: ['./car-rent.component.css']
})

export class CarRentComponent implements OnInit {

  rental: Rental;
  carId: number;
  addRentCarForm: FormGroup;
  isLoggedIn: Observable<boolean>;
  currentUser: User;
  currentDate: Date = new Date();

  constructor(private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService,
    private rentalService: RentalService,
    private authService: AuthService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.loginStatus;
    this.isLoggedIn.subscribe(() => {  //if logged in
      this.getCurrentUser();
    })
    this.carId = parseInt(this.activatedRoute.snapshot.params['carId']);
    this.createAddRentCarForm();
  }

  createAddRentCarForm() {
    this.addRentCarForm = this.formBuilder.group({
      carId: [this.carId, Validators.required],
      customerId: [this.currentUser.id, Validators.required],
      rentDate: ['', [Validators.required]],
      returnDate: ['', Validators.required]
    });
  }

  getCurrentUser() {
    this.currentUser = this.authService.getUser()!;
  }

  rent() {
    if (this.addRentCarForm.invalid) {
      this.toastrService.warning('Alanları kontrol ediniz', 'Dikkat');
      return;
    }

    this.rental = this.addRentCarForm.value;
    let rentDate = new Date(this.rental.rentDate);
    let returnDate = new Date(this.rental.returnDate);

    if (rentDate < this.currentDate) {
      this.toastrService.warning(
        'Kiralama tarihi, bu günden sonraki günler olmalıdır', 'Dikkat'
      );
      return;
    }

    if (returnDate < rentDate || returnDate.getDate() == rentDate.getDate()) {
      this.toastrService.warning(
        'Teslim tarihi, kiralama tarihinden sonraki günler olmalıdır', 'Dikkat'
      );
      return;
    }

    this.rentalService.isRentable(this.rental).subscribe(response => {
      if (!response.success) {
        this.toastrService.warning(
          'Bu aracı bu tarihler arasında kiralayamazsınız', 'Dikkat'
        );
        return;
      }

      this.rentalService.setRentingCar(this.rental);
      this.toastrService.success('Ödeme sayfasına yönlendiriliyorsunuz');
      return this.router.navigate(['/payment', this.carId]);
    });
  }
}
