import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-edit',
  templateUrl: './color-edit.component.html',
  styleUrls: ['./color-edit.component.css'],
  providers: [ColorService]
})
export class ColorEditComponent implements OnInit {
  color!: Color;
  colorEditForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private colorService: ColorService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getColorIdFromParam();
  }

  createColorForm() {
    this.colorEditForm = this.formBuilder.group({
      name: [this.color.name, Validators.required],
    });
  }

  getColorIdFromParam() {
    this.activatedRoute.params.subscribe((params) => {
      if (params['id']) this.getColorById(params['id']);
    });
  }

  getColorById(colorId: number) {
    this.colorService.getById(colorId).subscribe((response) => {
      this.color = response.data;

      this.createColorForm();
    });
  }

  update() {
    if (!this.colorEditForm.valid) {
      this.toastrService.error('Formda eksik alanlar var.');
      return;
    }

    let colorModule: Color = { id: this.color.id, ...this.colorEditForm.value };
    this.colorService.update(colorModule).subscribe((response) => {
      this.toastrService.success(response.message);
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
              'Do??rulama hatas??'
            );
          }
        }
      }
      else {
        this.toastrService.error(
          'L??tfen sistem y??neticisi ile ileti??ime ge??in.',
          'Kay??t yap??lamad??'
        );
      }
    });
  }

  delete() {
    if (window.confirm('Rengi silmek istedi??inize emin misiniz?')) {
      let colorModule: Color = {
        id: this.color.id,
        ...this.colorEditForm.value,
      };
      this.colorService.delete(colorModule).subscribe((response) => {
        this.toastrService.success(response.message);
        this.router.navigate(['', 'colors']);
      });
    }
  }

}
