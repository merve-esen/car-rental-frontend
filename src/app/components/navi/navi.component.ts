import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {
  currentUser: User;
  isAdmin: boolean;
  isLoggedIn: Observable<boolean>;

  constructor(
    private authService: AuthService,
    private toastrService: ToastrService,
    private router: Router) { }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.loginStatus;
    this.isLoggedIn.subscribe(() => {  //if logged in
      this.getCurrentUser();
      this.checkifAdmin();
    })
  }

  logOut() {
    this.authService.logOut();
    this.router.navigate([""])
    this.toastrService.success("", "Çıkış yapıldı");
  }

  checkifAdmin() {
    if (this.authService.isLoggedIn) {
      this.isAdmin = this.authService.hasRole(this.currentUser, "admin");
    } else {
      this.isAdmin = undefined!;
    }
  }

  getCurrentUser() {
    this.currentUser = this.authService.getUser()!;
  }
}
