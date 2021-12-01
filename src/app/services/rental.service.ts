import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { RentalDetail } from '../models/rentalDetail';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class RentalService {
  apiUrl = 'https://localhost:44305/api/rentals/';
  constructor(private httpClient: HttpClient) {}

  getAllRentalDetails(): Observable<ListResponseModel<RentalDetail>> {
    return this.httpClient.get<ListResponseModel<RentalDetail>>(this.apiUrl + "getAllRentalDetails");
  }

  add(carId: number, customerId: number, rentDate: Date, returnDate: Date) {
    let rental = {
      carId,
      customerId,
      rentDate,
      returnDate
    };
    return this.httpClient.post<ResponseModel>(this.apiUrl + "add", rental);
  }
}
