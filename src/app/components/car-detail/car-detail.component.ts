import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { CarImage } from 'src/app/models/carImage';
import { Color } from 'src/app/models/color';
import { Rental } from 'src/app/models/rental';
import { BrandService } from 'src/app/services/brand.service';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {

  car!: Car;
  brand!: Brand;
  color!: Color;
  carImages!: CarImage[];
  DateTimeNow: Date = new Date();
  rentDate: Date = this.DateTimeNow;
  returnDate: Date = this.DateTimeNow;

  constructor(
    private activatedRoute: ActivatedRoute,
    private brandService: BrandService,
    private carService: CarService,
    private colorService: ColorService,
    private carImageService: CarImageService,
    private rentalService: RentalService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.getCarById(params['carId']);
    });
  }

  getCarById(carId: number) {
    this.carService.getById(carId).subscribe((response) => {
      this.car = response.data;

      this.getBrandById(this.car.brandId);
      this.getColorById(this.car.colorId);
      this.getCarImagesById(this.car.id);
    });
  }

  getBrandById(brandId: number) {
    this.brandService
      .getById(brandId)
      .subscribe((response) => (this.brand = response.data));
  }

  getColorById(colorId: number) {
    this.colorService
      .getById(colorId)
      .subscribe((response) => (this.color = response.data));
  }

  getCarImagesById(carId: number) {
    this.carImageService
      .getImagesByCarId(carId)
      .subscribe((response) => (this.carImages = response.data));
  }

  rentCar() {
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
  }

  isActiveCarousel(carImageIndex: number): string {
    return carImageIndex == 0 ? 'active' : '';
  }

  getCarImageUrl(carImageId: number): string {
    return this.carImageService.getCarImageUrl(carImageId);
  }

}
