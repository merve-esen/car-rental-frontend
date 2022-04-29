import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService]
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private authService: AuthService, private toastrService: ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm(){
    this.loginForm = this.formBuilder.group({
      email: ["", Validators.required],
      password: ["", Validators.required]
    })
  }

  login(){
    if(this.loginForm.valid){
      let loginModel = Object.assign({}, this.loginForm.value)

      this.authService.login(loginModel).subscribe(response=>{
        localStorage.setItem("token", response.data.token)
        this.toastrService.info("Giriş başarılı")
        this.router.navigate(['', 'car-list']);
      }, responseError=>{
        this.toastrService.error(responseError.error)
      })
    }
  }

}
