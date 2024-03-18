import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ValidatorsService } from '../../services/validators.service';

@Component({
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css'],
})
export class RegisterPageComponent {
  private authService = inject(AuthService);
  private validatorsService = inject(ValidatorsService);
  private fb = inject(FormBuilder);

  public myForm = this.fb.group(
    {
      name: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.pattern(this.validatorsService.emailPattern)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
    },
    {
      validators: [
        this.validatorsService.isFieldOneEqualFieldTwo(
          'password',
          'confirmPassword'
        ),
      ],
    }
  );
  constructor() {}

  register() {
    console.log(this.myForm.value);

  }
}
