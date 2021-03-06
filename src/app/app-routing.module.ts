import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountSettingsComponent } from './components/account-settings/account-settings.component';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { BrandEditComponent } from './components/brand-edit/brand-edit.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarEditComponent } from './components/car-edit/car-edit.component';
import { CarRentPaymentComponent } from './components/car-rent-payment/car-rent-payment.component';
import { CarRentComponent } from './components/car-rent/car-rent.component';
import { CarsViewComponent } from './components/cars-view/cars-view.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { ColorEditComponent } from './components/color-edit/color-edit.component';
import { HomeComponent } from './components/home/home.component';
import { RentalsViewComponent } from './components/rentals-view/rentals-view.component';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "brands/add", component: BrandAddComponent, canActivate: [LoginGuard] },
  { path: "brands/:brandId/edit", component: BrandEditComponent, canActivate: [LoginGuard] },
  { path: "colors/add", component: ColorAddComponent, canActivate: [LoginGuard] },
  { path: "colors/:colorId/edit", component: ColorEditComponent, canActivate: [LoginGuard] },
  { path: "cars", component: CarsViewComponent },
  { path: "cars/brand/:brandId", component: CarsViewComponent },
  { path: "cars/color/:colorId", component: CarsViewComponent },
  { path: "cars/add", component: CarAddComponent, canActivate: [LoginGuard] },
  { path: "cars/:carId", component: CarDetailComponent },
  { path: "cars/:carId/edit", component: CarEditComponent, canActivate: [LoginGuard] },
  { path: "cars/:carId/rent", component: CarRentComponent, canActivate: [LoginGuard] },
  { path: "cars/:carId/rent/:rentDateStr/:returnDateStr/payment", component: CarRentPaymentComponent, canActivate: [LoginGuard] },
  { path: "rentals", component: RentalsViewComponent },
  { path: "account-settings", component: AccountSettingsComponent, canActivate: [LoginGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
