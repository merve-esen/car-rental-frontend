import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './guards/login.guard';
import { RoleGuard } from './guards/role.guard';
import { CarEditComponent } from './components/car-edit/car-edit.component';
import { CarListComponent } from './components/car-list/car-list.component';
import { ColorEditComponent } from './components/color-edit/color-edit.component';
import { BrandEditComponent } from './components/brand-edit/brand-edit.component';
import { ColorComponent } from './components/color/color.component';
import { BrandComponent } from './components/brand/brand.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { CarComponent } from './components/car/car.component';
import { CustomerComponent } from './components/customer/customer.component';
import { RentalComponent } from './components/rental/rental.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { CarImageComponent } from './components/car-image/car-image.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { PaymentComponent } from './components/payment/payment.component';
import { ProfileComponent } from './components/profile/profile.component';

const routes: Routes = [
  {path:"", pathMatch:"full", component:CarListComponent},
  {path:"car-list", pathMatch:"full", component:CarListComponent},
  {path:"cars", pathMatch:"full", component:CarComponent},
  {path:"car/:carId", pathMatch:"full", component:CarDetailComponent},
  {path:"cars/edit/:id", component:CarEditComponent, canActivate: [LoginGuard, RoleGuard], data: { expectedRole: 'admin' }},
  {path:"cars/edit/images/:carId", component:CarImageComponent, canActivate: [LoginGuard, RoleGuard], data: { expectedRole: 'admin' }},
  {path:"cars/brand/:brandName", pathMatch:"full", component:CarComponent},
  {path:"cars/color/:colorName", pathMatch:"full", component:CarComponent},
  {path:"cars/brand/:brandName/color/:colorName", pathMatch:"full", component:CarComponent},
  {path:"cars/add", component:CarAddComponent, canActivate: [LoginGuard, RoleGuard], data: { expectedRole: 'admin' }},
  {path:"brands", pathMatch:"full", component:BrandComponent},
  {path:"brands/add", component:BrandAddComponent, canActivate: [LoginGuard, RoleGuard], data: { expectedRole: 'admin' }},
  {path:"brands/edit/:id", component:BrandEditComponent, canActivate: [LoginGuard, RoleGuard], data: { expectedRole: 'admin' }},
  {path:"colors", pathMatch:"full", component:ColorComponent},
  {path:"colors/add", component:ColorAddComponent, canActivate: [LoginGuard, RoleGuard], data: { expectedRole: 'admin' }},
  {path:"colors/edit/:id", component:ColorEditComponent, canActivate: [LoginGuard, RoleGuard], data: { expectedRole: 'admin' }},
  {path:"customers", component:CustomerComponent, canActivate: [LoginGuard, RoleGuard], data: { expectedRole: 'admin' }},
  {path:"rentals", component:RentalComponent, canActivate: [LoginGuard]},
  {path:"login", component:LoginComponent, canActivate: [LoginGuard]},
  {path:"register", component:RegisterComponent, canActivate: [LoginGuard]},
  {path:"profile", component:ProfileComponent, canActivate: [LoginGuard]},
  {path:"payment/:carId", component:PaymentComponent, canActivate: [LoginGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
