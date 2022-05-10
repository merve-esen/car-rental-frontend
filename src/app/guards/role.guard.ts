import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private toastrService: ToastrService,
    private router: Router,
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const expectedRole = route.data.expectedRole;
      if (this.authService.isLoggedIn) {
        let user: User = this.authService.getUser()!;
        if (this.authService.hasRole(user, expectedRole)) {
          return true;
        } else {
          this.router.navigate([""]);
          this.toastrService.warning("Bu sayfaya erişmek için yetkiniz yok", "Erişim engellendi!");
          return false;
        }
      } else {
        return false;
      }
  }

}
