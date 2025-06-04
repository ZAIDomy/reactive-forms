import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '../../../utils/form-utils';

@Component({
  selector: 'app-dinamic-page',
  imports: [JsonPipe,ReactiveFormsModule],
  templateUrl: './dinamic-page.component.html',
})
export class DinamicPageComponent {
  private fb = inject(FormBuilder);
  formUtils = FormUtils;

  myForm = this.fb.group({
    name: ['',[Validators.required,Validators.minLength(3)]],
    favoriteGames: this.fb.array([
      ['Metal Gear',Validators.required],
      ['Death Standing',Validators.required],
    ],
    Validators.minLength(3)
  )
  });

  get favoriteGames(){
    return this.myForm.get('favoriteGames') as FormArray;
  }





}
