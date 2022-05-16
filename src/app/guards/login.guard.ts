import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private authService: AuthService, private toastrService: ToastrService, private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authService.isLoggedIn) {
      if (route.routeConfig?.path === "login" || route.routeConfig?.path === "register") {
        this.router.navigate([""]);
        this.toastrService.warning("Sisteme zaten giriş yapılmış");
        return false;
      } else {
        return true;
      }
    } else {
      if (route.routeConfig?.path === "login" || route.routeConfig?.path === "register") {
        return true;
      } else {
        this.authService.logOut();
        this.router.navigate(["login"]);
        this.toastrService.error("Sisteme giriş yapmalısınız");
        return false;
      }
    }
  }
}
