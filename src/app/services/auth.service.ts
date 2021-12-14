import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AccessTokenModel } from '../models/accessTokenModel';
import { ItemResponseModel } from '../models/itemResponseModel';
import { LoginCreds } from '../models/loginCreds';
import { RegisterCreds } from '../models/registerCreds';
import { ResponseModel } from '../models/responseModel';
import { UserInfo } from '../models/userInfo';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = 'https://localhost:44305/api/auth/';
  constructor(private httpClient: HttpClient, private localStorageService: LocalStorageService) {}
  
  login(loginCreds: LoginCreds): Observable<ItemResponseModel<AccessTokenModel>> {
    return this.httpClient.post<ItemResponseModel<AccessTokenModel>>(this.apiUrl + "login", loginCreds);
  }
  
  register(registerCreds: RegisterCreds): Observable<ItemResponseModel<AccessTokenModel>> {
    return this.httpClient.post<ItemResponseModel<AccessTokenModel>>(this.apiUrl + "register", registerCreds);
  }
  
  changePassword(currentPassword: string, newPassword: string): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + "changePassword", {currentPassword, newPassword});
  }

  logout() {
    this.localStorageService.unset("accessToken");
    this.localStorageService.unset("userFullName");
    this.localStorageService.unset("userId");
    this.localStorageService.unset("userCustomerId");
  }

  isAuthenticated(): boolean {
    return this.localStorageService.get("accessToken") != null;
  }

  setAccessToken(accessToken: string) {
    this.localStorageService.set("accessToken", accessToken);
  }
  
  getAccessToken() {
    return this.localStorageService.get("accessToken");
  }

  setUserInfo(userInfo: UserInfo) {
    this.localStorageService.set("userFullName", userInfo.firstName + " " + userInfo.lastName);
    this.localStorageService.set("userId", "" + userInfo.id);
    this.localStorageService.set("userCustomerId", "" + userInfo.customerId);
  }

  getUserFullName(): string {
    if (this.isAuthenticated()) {
      return this.localStorageService.get("userFullName") ?? "";
    } else {
      return "";
    }
  }
  
  getUserId(): number {
    if (this.isAuthenticated()) {
      let value = this.localStorageService.get("userId");
      return value ? parseInt(value) : 0;
    } else {
      return 0;
    }
  }

  getUserCustomerId(): number {
    if (this.isAuthenticated()) {
      let value = this.localStorageService.get("userCustomerId");
      return value ? parseInt(value) : 0;
    } else {
      return 0;
    }
  }
}
