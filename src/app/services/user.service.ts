import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ItemResponseModel } from '../models/itemResponseModel';
import { ResponseModel } from '../models/responseModel';
import { UserInfo } from '../models/userInfo';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl = 'https://localhost:44305/api/users/';
  constructor(private httpClient: HttpClient) {}

  getUserInfoByUserId(userId: number): Observable<ItemResponseModel<UserInfo>> {
    return this.httpClient.get<ItemResponseModel<UserInfo>>(this.apiUrl + "getUserInfoByUserId?userId=" + userId);
  }
  
  getUserInfoByEmail(email: string): Observable<ItemResponseModel<UserInfo>> {
    return this.httpClient.get<ItemResponseModel<UserInfo>>(this.apiUrl + "getUserInfoByEmail?email=" + email);
  }

  updateUserInfo(userInfo: UserInfo): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + "updateUserInfo", userInfo);
  }
}
