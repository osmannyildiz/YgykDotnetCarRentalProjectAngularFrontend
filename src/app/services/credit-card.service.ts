import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreditCard } from '../models/creditCard';
import { ItemResponseModel } from '../models/itemResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class CreditCardService {
  apiUrl = 'https://localhost:44305/api/creditCards/';
  constructor(private httpClient: HttpClient) {}
  
  getByUserId(userId: number): Observable<ItemResponseModel<CreditCard>> {
    return this.httpClient.get<ItemResponseModel<CreditCard>>(this.apiUrl + "getByUserId?userId=" + userId);
  }
  
  add(creditCard: CreditCard): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + "add", creditCard);
  }
  
  update(creditCard: CreditCard): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + "update", creditCard);
  }
  
  deleteById(id: number): Observable<ResponseModel> {
    return this.httpClient.delete<ResponseModel>(this.apiUrl + "deleteById?id=" + id);
  }
}
