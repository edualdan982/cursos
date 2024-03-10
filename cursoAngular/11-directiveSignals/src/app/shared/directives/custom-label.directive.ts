import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[customLabel]',
})
export class CustomLabelDirective implements OnInit {
  private htmlElement?: ElementRef<HTMLElement>;
  private _color: string = 'red';
  private _errors?: ValidationErrors | null;

  @Input()
  public set color(value: string) {
    console.log({ color: value });
    this._color = value;
    this.setStyle();
  }
  @Input()
  public set errors(value: ValidationErrors | null | undefined) {
    this._errors = value;
    this.setErrorMessage();
  }

  constructor(private nel: ElementRef<HTMLElement>) {
    console.log(nel);
    this.htmlElement = nel;
  }
  ngOnInit(): void {
    console.log('Directiva OnInit');
    this.setStyle();
  }

  setStyle(): void {
    if (!this.htmlElement) return;
    this.htmlElement!.nativeElement.style.color = this._color;
  }

  setErrorMessage() {
    if (!this.htmlElement) return;
    if (!this._errors) {
      this.htmlElement!.nativeElement.innerHTML = 'No hay errores';
      this._color = 'grey'
      this.setStyle();
      return;
    }
    const errorsKey = Object.keys(this._errors);

    if(errorsKey.includes('required')){
      this.htmlElement!.nativeElement.innerHTML = 'Este campo es obligatorio';
      return;
    }
    if(errorsKey.includes('minlength')){

      const {actualLength, requiredLength} = this._errors['minlength'];
      this.htmlElement!.nativeElement.innerHTML = `Debe tener al menos ${actualLength}/${requiredLength} caracteres`;
      return;
    }
    if(errorsKey.includes('email')){
      this.htmlElement!.nativeElement.innerHTML = 'No tiene formato de correo electrónico';
      return;
    }
  }
}
