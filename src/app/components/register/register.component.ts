import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [AuthService]
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private authService: AuthService, private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.createRegisterForm();
  }

  createRegisterForm(){
    this.registerForm = this.formBuilder.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      email: ["", Validators.required],
      password: ["", Validators.required]
    })
  }

  register(){
    if(this.registerForm.valid){
      let registerModel = Object.assign({}, this.registerForm.value)

      this.authService.register(registerModel).subscribe(response=>{
        localStorage.setItem("token", response.data.token)
        this.toastrService.info(response.message)
      }, responseError=>{
        this.toastrService.error(responseError.error)
      })
    }
  }

}
