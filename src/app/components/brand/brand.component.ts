import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css'],
  providers: [BrandService]
})
export class BrandComponent implements OnInit {
  brands: Brand[] = [];
  //currentBrand: Brand; // Normalde Brand = {id:0, name:""} dememiz gerekiyordu ama tsconfig.ts
  //dosyasında "strictPropertyInitialization": false, eklediğimiz için gerek kalmadı.
  //filterText="";

  constructor(private brandService: BrandService,
    private toastrService: ToastrService) {}

  ngOnInit(): void {
    this.getBrands();
  }

  getBrands() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
    });
  }

  delete(brand:Brand) {
    if (window.confirm('Kaydı silmek istediğinize emin misiniz?')){
      this.brandService.delete(brand).subscribe((response) => {
        this.toastrService.success(response.message);
        this.getBrands();
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
