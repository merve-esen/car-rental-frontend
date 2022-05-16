import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { CarDetail } from 'src/app/models/carDetail';
import { CarImage } from 'src/app/models/carImage';
import { CarService } from 'src/app/services/car.service';
import { CarImageService } from 'src/app/services/car-image.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css'],
  providers: [CarService, CarImageService]
})
export class CarDetailComponent implements OnInit {

  carDetail: CarDetail;
  carImages!: CarImage[];
  isLoggedIn: Observable<boolean>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private carService: CarService,
    private carImageService: CarImageService,
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.loginStatus;
    this.activatedRoute.params.subscribe((params) => {
      this.getCarDetailByCarId(params['carId']);
    });
  }

  getCarDetailByCarId(carId: number) {
    this.carService.getCarDetailByCarId(carId).subscribe((response) => {
      this.carDetail = response.data;
      this.getCarImagesById(this.carDetail.carId);
    });
  }

  getCarImagesById(carId: number) {
    this.carImageService
      .getImagesByCarId(carId)
      .subscribe((response) => (this.carImages = response.data));
  }

  /*rentCar() {
    let rental: Rental = {
      carId: this.car.id,
      customerId: 1, //TODO
      rentDate: new Date(this.rentDate),
      returnDate: new Date(this.returnDate),
    };

    this.rentalService.isRentable(rental).subscribe(() => {
      this.toastr.info('Ödeme sayfasına yönlendiriliyorsunuz.');
        this.router.navigateByUrl('/checkout');
    });
  }*/

  isActiveCarousel(carImageIndex: number): string {
    return carImageIndex == 0 ? 'active' : '';
  }

  getCarImageUrl(carImageId: number): string {
    return this.carImageService.getCarImageUrl(carImageId);
  }

}
