import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarRentPaymentComponent } from './components/car-rent-payment/car-rent-payment.component';
import { CarRentComponent } from './components/car-rent/car-rent.component';
import { CarsViewComponent } from './components/cars-view/cars-view.component';
import { HomeComponent } from './components/home/home.component';
import { RentalsViewComponent } from './components/rentals-view/rentals-view.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "cars", component: CarsViewComponent },
  { path: "cars/brand/:brandId", component: CarsViewComponent },
  { path: "cars/color/:colorId", component: CarsViewComponent },
  { path: "cars/:carId", component: CarDetailComponent },
  { path: "cars/:carId/rent", component: CarRentComponent },
  { path: "cars/:carId/rent/:rentDateStr/:returnDateStr/payment", component: CarRentPaymentComponent },
  { path: "rentals", component: RentalsViewComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
