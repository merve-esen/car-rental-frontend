import { ColorService } from './../../services/color.service';
import { Component, OnInit } from '@angular/core';
import { Color } from 'src/app/models/color';
import { ToastrService } from 'ngx-toastr';

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

  constructor(private colorService: ColorService,
    private toastrService: ToastrService) {}

  ngOnInit(): void {
    this.getColors();
  }

  getColors() {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
    });
  }

  delete(color:Color) {
    if (window.confirm('Kaydı silmek istediğinize emin misiniz?')){
      this.colorService.delete(color).subscribe((response) => {
        this.toastrService.success(response.message);
        this.getColors();
      },
      (responseError) => {
          this.toastrService.error(
            'Lütfen sistem yöneticisi ile iletişime geçin.',
            'Hata'
          );
      });
    }
  }
}
