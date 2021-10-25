import { CarService } from './../../services/car.service';
import { Component, OnInit } from '@angular/core';
import { CarDetail } from 'src/app/models/carDetail';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
})
export class CarComponent implements OnInit {
  cars: CarDetail[] = [];
  dataLoaded = false;

  constructor(private carService: CarService, private activatedRoute:ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["brandName"] && params["colorName"]){
        this.getCarsByBrandAndColor(params["brandName"], params["colorName"])
      } else if(params["brandName"]){
        this.getCarsByBrand(params["brandName"])
      } else if(params["colorName"]){
        this.getCarsByColor(params["colorName"])
      } else {
        this.getCars()
      }
    })
  }

  getCars() {
    this.carService.getCarDetails().subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
    });
  }

  getCarsByBrand(brandName: string) {
    this.carService.getCarsByBrand(brandName).subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
    });
  }

  getCarsByColor(colorName: string) {
    this.carService.getCarsByColor(colorName).subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
    });
  }

  getCarsByBrandAndColor(brandName: string, colorName: string) {
    this.carService.getCarsByBrandAndColor(brandName, colorName).subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
    });
  }
}
