import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-add',
  templateUrl: './color-add.component.html',
  styleUrls: ['./color-add.component.css'],
  providers: [ColorService]
})
export class ColorAddComponent implements OnInit {

  colorAddForm: FormGroup;
  constructor(private formBuilder: FormBuilder,
    private colorService:ColorService,
    private toastrService:ToastrService,
    private router: Router) { }

  ngOnInit(): void {
    this.createColorAddForm();
  }

  createColorAddForm(){
    this.colorAddForm = this.formBuilder.group({
      name: ["", Validators.required]
    })
  }

  add(){
    if(this.colorAddForm.valid){
      let colorModel = Object.assign({},this.colorAddForm.value)
      this.colorService.add(colorModel).subscribe(response=>{
        this.toastrService.success(response.message, "Başarılı")
        this.router.navigate(['', 'colors']);
      },(responseError) => {
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
          this.toastrService.error(
            'Lütfen sistem yöneticisi ile iletişime geçin.',
            'Kayıt yapılamadı'
          );
        }
      })
    }else{
      this.toastrService.error("Lütfen bilgilerinizi kontrol ediniz", "Dikkat")
    }
  }

}
