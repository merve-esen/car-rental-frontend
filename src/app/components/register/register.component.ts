import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [AuthService]
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  rememberMe: boolean = false;

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastrService: ToastrService,
    private localStorageService: LocalStorageService,
    private router: Router) { }

  ngOnInit(): void {
    this.createRegisterForm();
  }

  createRegisterForm(){
    this.registerForm = this.formBuilder.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required],
      confirmPassword: ["", [Validators.required]]
    })
  }

  register(){
    if(this.registerForm.valid){
      if (this.registerForm.value['password'] != this.registerForm.value['confirmPassword']) {
        this.toastrService.error('Şifreler uyuşmuyor', 'Hata');
        return;
      }
      let registerModel = Object.assign({}, this.registerForm.value)
      delete registerModel["confirmPassword"]
      this.authService.register(registerModel).subscribe(response=>{
        this.localStorageService.add("token", response.data.token);
        if (this.rememberMe) {
          this.saveEmail(registerModel.email);
        }
        this.authService.isLoggedIn = true;
        this.router.navigate([""]);
        this.toastrService.success("Kayıt başarılı");
      }, responseError=>{
        this.toastrService.error(responseError.error)
      })
    }
    else{
      this.toastrService.warning('Lütfen bilgilerinizi kontrol ediniz', 'Dikkat');
      return;
    }
  }

  saveEmail(email: string) {
    this.localStorageService.add("remember", email);
  }
}
