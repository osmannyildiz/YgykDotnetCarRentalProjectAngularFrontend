import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  apiUrl = 'https://localhost:44305/api/payment/';
  constructor(private httpClient: HttpClient) {}

  process(creditCardNumber: string, creditCardExpiry: string, creditCardCvc: string): Observable<ResponseModel> {
    let paymentDetails = {
      creditCardNumber,
      creditCardExpiry,
      creditCardCvc
    };
    return this.httpClient.post<ResponseModel>(this.apiUrl + "process", paymentDetails);
  }
}
