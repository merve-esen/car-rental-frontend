import { CarImage } from './../../models/carImage';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { Color } from 'src/app/models/color';
import { CarService } from 'src/app/services/car.service';
import { BrandService } from 'src/app/services/brand.service';
import { ColorService } from 'src/app/services/color.service';
import { CarImageService } from 'src/app/services/car-image.service';

@Component({
  selector: 'app-car-edit',
  templateUrl: './car-edit.component.html',
  styleUrls: ['./car-edit.component.css'],
  providers: [CarService, BrandService, ColorService, CarImageService]
})
export class CarEditComponent implements OnInit {

  car!: Car;
  carDataLoaded: boolean = false;
  brands: Brand[] = [];
  colors: Color[] = [];
  carImages: CarImage[] = [];
  carEditForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private carService: CarService,
    private brandService: BrandService,
    private colorService: ColorService,
    private carImageService: CarImageService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getCarIdFromParam();
    this.getBrands();
    this.getColors();
  }

  getCarIdFromParam() {
    this.activatedRoute.params.subscribe((params) => {
      if (params['id']) this.getCarById(params['id']);
    });
  }

  getCarById(carId: number) {
    this.carService.getById(carId).subscribe((response) => {
      this.car = response.data;
      this.carDataLoaded = true;
      this.createCarForm();
      this.getCarImagesById(this.car.id);
    });
  }

  getCarImagesById(carId: number) {
    this.carImageService.getImagesByCarId(carId).subscribe((response) => {
      this.carImages = response.data;
    });
  }

  createCarForm() {
    this.carEditForm = this.formBuilder.group({
      brandId: [this.car.brandId, Validators.required],
      colorId: [this.car.colorId, Validators.required],
      dailyPrice: [this.car.dailyPrice, Validators.required],
      modelYear: [this.car.modelYear, Validators.required],
      description: [this.car.description, Validators.required],
      brandFilterText: [''],
      colorFilterText: [''],
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

  update() {
    if (!this.carEditForm.valid) {
      this.toastrService.warning('Formda eksik alanlar var.');
      return;
    }

    let carModule: Car = { id: this.car.id, ...this.carEditForm.value };
    this.carService.update(carModule).subscribe((response) => {
      this.toastrService.success(response.message);
      this.router.navigate(['', 'cars']);
    },(responseError) => {
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
    });
  }

  delete() {
    if (window.confirm('Kaydı silmek istediğinize emin misiniz?')) this.deleteCar();
  }

  deleteCar() {
    let carModule: Car = { id: this.car.id, ...this.carEditForm.value };
    this.carService.delete(carModule).subscribe((response) => {
      this.toastrService.success(response.message);
      this.router.navigate(['', 'cars']);
    });
  }
}
