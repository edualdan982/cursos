import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ValidatorsService } from 'src/app/shared/services/validators.service';

@Component({
  templateUrl: './dynamic-page.component.html',
  styles: [],
})
export class DynamicPageComponent {
  // public myForm2 = new FormGroup({ favoriteGames: new FormArray([]) });

  public myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    favoriteGames: this.fb.array([
      ['Metal Gear', Validators.required],
      ['Dead Stranding', Validators.required],
    ]),
  });

  public newFavorite: FormControl = new FormControl('', [Validators.required]);

  constructor(
    private fb: FormBuilder,
    private validatorsService: ValidatorsService
  ) {}

  get favoriteGames() {
    return this.myForm.controls['favoriteGames'] as FormArray;
  }

  isValidFieldInArray(formArray: FormArray, index: number) {
    return this.validatorsService.isValidFieldInArray(formArray, index);
  }
  isValidField(field: string): boolean | null {
    return this.validatorsService.isValidField(this.myForm, field);
  }

  getFieldError(field: string): string | null {
    return this.validatorsService.getFieldError(this.myForm, field);
  }
  onAddToFavorites() {
    if (this.newFavorite.invalid) return;

    const newGame = this.newFavorite.value;
    // this.favoriteGames.push(new FormControl( newGame, [Validators.required]));
    this.favoriteGames.push(this.fb.control(newGame, [Validators.required]));
    this.newFavorite.reset();
  }
  onDeleteFavorite(index: number): void {
    this.favoriteGames.removeAt(index);
  }
  onSubmit(): void {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    console.log(this.myForm.value);
    (this.myForm.controls['favoriteGames'] as FormArray) = this.fb.array([]);
    this.myForm.reset();
  }
}
