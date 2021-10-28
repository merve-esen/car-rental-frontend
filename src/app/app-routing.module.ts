import { CarComponent } from './components/car/car.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './components/customer/customer.component';
import { RentalComponent } from './components/rental/rental.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';

const routes: Routes = [
  {path:"", pathMatch:"full", component:CarComponent},
  {path:"cars", pathMatch:"full", component:CarComponent},
  {path:"car/:carId", pathMatch:"full", component:CarDetailComponent},
  {path:"cars/brand/:brandName", pathMatch:"full", component:CarComponent},
  {path:"cars/color/:colorName", pathMatch:"full", component:CarComponent},
  {path:"cars/brand/:brandName/color/:colorName", pathMatch:"full", component:CarComponent},
  {path:"customers", component:CustomerComponent},
  {path:"rentals", component:RentalComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
