import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-basic-page',
  imports: [JsonPipe,ReactiveFormsModule],
  templateUrl: './basic-page.component.html',
})
export class BasicPageComponent {

  private fb = inject(FormBuilder);

  myForm: FormGroup = this.fb.group({
    name: ['',[Validators.required,Validators.minLength(3)]],
    price: [0,[Validators.required,Validators.min(10)]],
    inStorage: [0,[Validators.required,Validators.min(0)]],
  })



/*   myForm=new FormGroup({
    name: new FormControl(''),
    price: new FormControl(0),
    inStorage: new FormControl(0),
  });*/

  isValidField(fieldName: string): boolean|null {
    return !!this.myForm.controls[fieldName].errors;
  }

  getFieldError(fieldName: string): string|null {

    if(this.myForm.controls[fieldName]) return null;

    const errors = this.myForm.controls[fieldName].errors ?? {};

  }

} 
