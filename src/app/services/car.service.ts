import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { CarDetail } from '../models/carDetail';
import { ItemResponseModel } from '../models/itemResponseModel';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  apiUrl = 'https://localhost:44305/api/cars/';
  constructor(private httpClient: HttpClient) {}

  getById(id: number): Observable<ItemResponseModel<Car>> {
    return this.httpClient.get<ItemResponseModel<Car>>(this.apiUrl + "getById?id=" + id);
  }
  
  getAllCarDetails(): Observable<ListResponseModel<CarDetail>> {
    return this.httpClient.get<ListResponseModel<CarDetail>>(this.apiUrl + "getAllCarDetails");
  }

  getAllCarDetailsByBrandId(brandId: number): Observable<ListResponseModel<CarDetail>> {
    return this.httpClient.get<ListResponseModel<CarDetail>>(this.apiUrl + "getAllCarDetailsByBrandId?brandId=" + brandId);
  }
  
  getAllCarDetailsByColorId(colorId: number): Observable<ListResponseModel<CarDetail>> {
    return this.httpClient.get<ListResponseModel<CarDetail>>(this.apiUrl + "getAllCarDetailsByColorId?colorId=" + colorId);
  }

  getAllCarDetailsByBrandIdAndColorId(brandId: number, colorId: number): Observable<ListResponseModel<CarDetail>> {
    return this.httpClient.get<ListResponseModel<CarDetail>>(this.apiUrl + "getAllCarDetailsByBrandIdAndColorId?brandId=" + brandId + "&colorId=" + colorId);
  }

  getCarDetailByCarId(carId: number): Observable<ItemResponseModel<CarDetail>> {
    return this.httpClient.get<ItemResponseModel<CarDetail>>(this.apiUrl + "getCarDetailByCarId?carId=" + carId);
  }
}
