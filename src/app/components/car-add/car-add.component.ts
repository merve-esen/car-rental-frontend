import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css'],
  providers: [CarService, BrandService, ColorService],
})
export class CarAddComponent implements OnInit {
  brands: Brand[] = [];
  colors: Color[] = [];
  carAddForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private carService: CarService,
    private toastrService: ToastrService,
    private brandService: BrandService,
    private colorService: ColorService
  ) {}

  ngOnInit(): void {
    this.createCarAddForm();
    this.getBrands();
    this.getColors();
  }

  createCarAddForm() {
    this.carAddForm = this.formBuilder.group({
      brandId: ['', Validators.required],
      colorId: ['', Validators.required],
      modelYear: ['', Validators.required],
      dailyPrice: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  getBrands() {
    this.brandService
      .getBrands()
      .subscribe((response) => (this.brands = response.data));
  }

  getColors() {
    this.colorService
      .getColors()
      .subscribe((response) => (this.colors = response.data));
  }

  add() {
    if (this.carAddForm.valid) {
      let carModel = Object.assign({}, this.carAddForm.value);
      this.carService.add(carModel).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Başarılı');
        },
        (responseError) => {
          if(responseError.error.ValidationErrors){
            if (responseError.error.ValidationErrors.length > 0) {
              for (
                let i = 0;
                i < responseError.error.ValidationErrors.length;
                i++
              ) {
                this.toastrService.error(
                  responseError.error.ValidationErrors[i].ErrorMessage,
                  'Doğrulama hatası'
                );
              }
            }
          }
          else {
            this.toastrService.error(
              'Lütfen sistem yöneticisi ile iletişime geçin.',
              'Kayıt yapılamadı'
            );
          }
        }
      );
    } else {
      this.toastrService.error('Lütfen bilgilerinizi kontrol ediniz', 'Dikkat');
    }
  }
}
