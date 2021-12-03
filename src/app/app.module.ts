import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BrandsComponent } from './components/brands/brands.component';
import { ColorsComponent } from './components/colors/colors.component';
import { CustomersComponent } from './components/customers/customers.component';
import { CarsComponent } from './components/cars/cars.component';
import { RentalsComponent } from './components/rentals/rentals.component';
import { HomeComponent } from './components/home/home.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarsViewComponent } from './components/cars-view/cars-view.component';
import { RentalsViewComponent } from './components/rentals-view/rentals-view.component';
import { FilterBrandsPipe } from './pipes/filter-brands.pipe';
import { FilterColorsPipe } from './pipes/filter-colors.pipe';
import { FilterCarsPipe } from './pipes/filter-cars.pipe';
import { CarRentComponent } from './components/car-rent/car-rent.component';
import { CarRentPaymentComponent } from './components/car-rent-payment/car-rent-payment.component';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { BrandEditComponent } from './components/brand-edit/brand-edit.component';
import { ColorEditComponent } from './components/color-edit/color-edit.component';
import { CarEditComponent } from './components/car-edit/car-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    BrandsComponent,
    ColorsComponent,
    CustomersComponent,
    CarsComponent,
    RentalsComponent,
    HomeComponent,
    CarDetailComponent,
    CarsViewComponent,
    RentalsViewComponent,
    FilterBrandsPipe,
    FilterColorsPipe,
    FilterCarsPipe,
    CarRentComponent,
    CarRentPaymentComponent,
    BrandAddComponent,
    ColorAddComponent,
    CarAddComponent,
    BrandEditComponent,
    ColorEditComponent,
    CarEditComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: "toast-bottom-right",
      enableHtml: true
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
