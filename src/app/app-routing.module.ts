import { CarEditComponent } from './components/car-edit/car-edit.component';
import { CarListComponent } from './components/car-list/car-list.component';
import { ColorEditComponent } from './components/color-edit/color-edit.component';
import { BrandEditComponent } from './components/brand-edit/brand-edit.component';
import { ColorComponent } from './components/color/color.component';
import { BrandComponent } from './components/brand/brand.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { CarComponent } from './components/car/car.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './components/customer/customer.component';
import { RentalComponent } from './components/rental/rental.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { CarImageComponent } from './components/car-image/car-image.component';

const routes: Routes = [
  {path:"", pathMatch:"full", component:CarListComponent},
  {path:"car-list", pathMatch:"full", component:CarListComponent},
  {path:"cars", pathMatch:"full", component:CarComponent},
  {path:"car/:carId", pathMatch:"full", component:CarDetailComponent},
  {path:"cars/edit/:id", component:CarEditComponent},
  {path:"cars/edit/images/:carId", component:CarImageComponent},
  {path:"cars/brand/:brandName", pathMatch:"full", component:CarComponent},
  {path:"cars/color/:colorName", pathMatch:"full", component:CarComponent},
  {path:"cars/brand/:brandName/color/:colorName", pathMatch:"full", component:CarComponent},
  {path:"cars/add", component:CarAddComponent},
  {path:"brands", pathMatch:"full", component:BrandComponent},
  {path:"brands/add", component:BrandAddComponent},
  {path:"brands/edit/:id", component:BrandEditComponent},
  {path:"colors", pathMatch:"full", component:ColorComponent},
  {path:"colors/add", component:ColorAddComponent},
  {path:"colors/edit/:id", component:ColorEditComponent},
  {path:"customers", component:CustomerComponent},
  {path:"rentals", component:RentalComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
