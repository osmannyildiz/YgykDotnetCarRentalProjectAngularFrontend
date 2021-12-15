import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(
    // private router: Router,
    private authService: AuthService,
    private toastrService: ToastrService,
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authService.isAuthenticated()) {
      return true;
    } else {
      // this.router.navigate(["login-required"]);
      this.toastrService.warning("Bu sayfayı görebilmek için giriş yapmış olmanız gerekir.", "Lütfen Giriş Yapın");
      return false;
    }
  }
  
}
