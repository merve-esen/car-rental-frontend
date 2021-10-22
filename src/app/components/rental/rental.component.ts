import { RentalService } from './../../services/rental.service';
import { Component, OnInit } from '@angular/core';
import { RentalDetail } from 'src/app/models/rentalDetail';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css'],
})
export class RentalComponent implements OnInit {
  rentals: RentalDetail[] = [];
  dataLoaded = false;

  constructor(private rentalService: RentalService) {}

  ngOnInit(): void {
    this.getRentals();
  }

  getRentals() {
    this.rentalService.getRentalDetails().subscribe((response) => {
      this.rentals = response.data;
      this.dataLoaded = true;
    });
  }
}
