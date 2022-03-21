import { ColorService } from './../../services/color.service';
import { Component, OnInit } from '@angular/core';
import { Color } from 'src/app/models/color';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.css'],
  providers: [ColorService]
})
export class ColorComponent implements OnInit {
  colors: Color[] = [];
  //currentColor: Color; // Normalde Color = {id:0, name:""} dememiz gerekiyordu ama tsconfig.ts
  //dosyasında "strictPropertyInitialization": false, eklediğimiz için gerek kalmadı.

  constructor(private colorService: ColorService) {}

  ngOnInit(): void {
    this.getColors();
  }

  getColors() {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
    });
  }

  /*setCurrentColor(color: Color) {
    this.currentColor = color;
  }

  resetCurrentColor() {
    this.currentColor = {id:0, name:""};
  }

  getCurrentColorClass(color: Color) {
    if (color == this.currentColor) {
      return 'list-group-item active';
    } else {
      return 'list-group-item';
    }
  }

  getAllColorClass() {
    if (!this.currentColor || this.currentColor.id==0) {
      return 'list-group-item active';
    } else {
      return 'list-group-item';
    }
  }*/
}
