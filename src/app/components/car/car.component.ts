import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarDetail } from 'src/app/models/carDetail';
import { CarService } from './../../services/car.service';
import { CarImageService } from 'src/app/services/car-image.service';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
  providers: [CarService, CarImageService]
})
export class CarComponent implements OnInit {
  carDetails: CarDetail[] = [];
  dataLoaded: boolean = false;

  @Input() carFilterText: string = '';
  @Input() class: string = '';

  constructor(
    private carService: CarService,
    private carImageService: CarImageService,
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      if (params['brand'] && params['color'])
        this.getCarDetailsByBrandNameAndColorName(
          params['brand'],
          params['color']
        );
      else if (params['brand']) this.getCarDetailsByBrand(params['brand']);
      else if (params['color']) this.getCarDetailsByColor(params['color']);
      else this.getCarDetails();
    });
  }

  getCarDetails() {
    this.carService.getCarDetails().subscribe((response) => {
      this.carDetails = response.data;
      this.dataLoaded = true;
      this.carDetails.forEach(carDetail => {
        this.getCarImagesById(carDetail);
      });
    });
  }

  getCarImagesById(carDetail: CarDetail) {
    this.carImageService.getImagesByCarId(carDetail.carId).subscribe((response) => {
      carDetail.carImageId = response.data[0].id;
    });
  }

  getCarImageUrl(carImageId: number): string {
    return this.carImageService.getCarImageUrl(carImageId);
  }

  getCarDetailsByBrand(brandName: string) {
    this.carService.getCarsByBrand(brandName).subscribe((response) => {
      this.carDetails = response.data;
      this.dataLoaded = true;
    });
  }

  getCarDetailsByColor(colorName: string) {
    this.carService.getCarsByColor(colorName).subscribe((response) => {
      this.carDetails = response.data;
      this.dataLoaded = true;
    });
  }

  getCarDetailsByBrandNameAndColorName(brandName: string, colorName: string) {
    this.carService
      .getCarsByBrandAndColor(brandName, colorName)
      .subscribe((response) => {
        this.carDetails = response.data;
        this.dataLoaded = true;
      });
  }

  delete(carDetail:CarDetail) {
    if (window.confirm('Kaydı silmek istediğinize emin misiniz?')) this.deleteCar(carDetail);
  }

  deleteCar(carDetail:CarDetail) {
    let carToDelete: Car = { id: carDetail.carId, brandId:0, colorId:0, dailyPrice:0, description:'', modelYear:0, minFindexScore:0 };
    this.carService.delete(carToDelete).subscribe((response) => {
      this.toastrService.success(response.message);
      this.getCarDetails();
    },
    (responseError) => {
        this.toastrService.error(
          'Lütfen sistem yöneticisi ile iletişime geçin.',
          'Hata'
        );
    });
  }
}
