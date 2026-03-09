import { Component, inject } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css'],
})
export class ProductPageComponent {
  //? Opción1.- Esto es totalmente valido para inyectar las dependencias
  // constructor(private fb: FormBuilder) { }

  //? Opción2.- Esta opcion usa como variable para inyectar la dependencia.
  // Constructor
  private fb: FormBuilder = inject(FormBuilder);

  public color: string = 'red';
  public myForm: FormGroup = this.fb.group({
    name: [
      '',
      [Validators.required, Validators.minLength(6), Validators.email],
    ],
  });

  changeColor() {
    this.color = '#xxxxxx'.replace(/x/g, (y) =>
      ((Math.random() * 16) | 0).toString(16)
    );
  }
}
