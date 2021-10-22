import { CarService } from './../../services/car.service';
import { Component, OnInit } from '@angular/core';
import { CarDetail } from 'src/app/models/carDetail';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
})
export class CarComponent implements OnInit {
  cars: CarDetail[] = [];
  dataLoaded = false;

  constructor(private carService: CarService) {}

  ngOnInit(): void {
    this.getCars();
  }

  getCars() {
    this.carService.getCarDetails().subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
    });
  }
}
