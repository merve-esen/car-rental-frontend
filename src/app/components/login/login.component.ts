import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  rememberMe: boolean = false;
  rememberedEmail: any;

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastrService: ToastrService,
    private localStorageService: LocalStorageService,
    private router: Router) { }

  ngOnInit(): void {
    this.createLoginForm();
    this.checkRememberedUser();
    this.autoFillEmail();
  }

  createLoginForm(){
    this.loginForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required]
    })
  }

  login(){
    if(this.loginForm.valid){
      let loginModel = Object.assign({}, this.loginForm.value)

      this.authService.login(loginModel).subscribe(response=>{
        this.localStorageService.add("token", response.data.token);
        this.authService.isLoggedIn = true;
        if (this.rememberMe) {
          this.saveEmail(loginModel.email);
        }
        this.toastrService.info("Giriş yapıldı")
        this.router.navigate(['/']);
      }, responseError=>{
        this.authService.isLoggedIn = false;
        if(responseError.error.ValidationErrors){
          if (responseError.error.ValidationErrors.length > 0) {
            for (
              let i = 0;
              i < responseError.error.ValidationErrors.length;
              i++
            ) {
              this.toastrService.error(
                responseError.error.ValidationErrors[i].ErrorMessage,
                'Doğrulama hatası'
              );
            }
          }
        }
        else {
          this.toastrService.error(responseError.error);
        }
      })
    }
    else{
      this.toastrService.warning('Lütfen bilgilerinizi kontrol ediniz', 'Dikkat');
      return;
    }
  }

  autoFillEmail() {
    if (this.rememberedEmail) {
      let email = this.localStorageService.getItem("remember");
      if (email != null) {
        this.loginForm.get("email")?.setValue(email);
      }
    }
  }

  deleteRememberedEmail() {
    this.localStorageService.remove("remember");
  }

  checkRememberedUser() {
    let result = this.localStorageService.getItem("remember");
    if (result != null) {
      this.rememberedEmail = result;
    } else {
      this.rememberedEmail = undefined;
    }
  }

  saveEmail(email: string) {
    this.localStorageService.add("remember", email);
  }
}
