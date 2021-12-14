import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreditCard } from '../models/creditCard';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  apiUrl = 'https://localhost:44305/api/payment/';
  constructor(private httpClient: HttpClient) {}

  process(amount: number, creditCard: CreditCard): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + "process", {amount, creditCard});
  }
}
