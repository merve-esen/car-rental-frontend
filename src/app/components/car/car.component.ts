import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarDetail } from 'src/app/models/carDetail';
import { CarService } from './../../services/car.service';
//import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
})
export class CarComponent implements OnInit {
  carDetails: CarDetail[] = [];
  dataLoaded: boolean = false;

  @Input() carFilterText: string = '';
  @Input() class: string = '';

  constructor(
    private carService: CarService,
    private activatedRoute: ActivatedRoute
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
    });
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
}
