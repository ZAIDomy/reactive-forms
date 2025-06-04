import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
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

  newFavorite = new FormControl('',Validators.required)
  /* newFavoriteGame = this.fb.control([]); */

  get favoriteGames(){
    return this.myForm.get('favoriteGames') as FormArray;
  }

  onAddToFavorites(){
    if(this.newFavorite.invalid) return;
    const newGame = this.newFavorite.value;

    this.favoriteGames.push(this.fb.control(newGame,Validators.required));

    this.newFavorite.reset();
  }

  onDeleteFavorite(index: number) {
    this.favoriteGames.removeAt(index);
  }

  onSubmit(){
    this.myForm.markAllAsTouched();
  }

}
