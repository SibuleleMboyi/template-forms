import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [
    ReactiveFormsModule
  ]
})
export class LoginComponent {
  public form = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.email],

    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(6)]
    })
  })

  get emailIsInvalid() {
    return this.form.controls.email.touched && this.form.controls.email.dirty && this.form.controls.email.invalid;
  }

  get passwordIsInvalid() {
    return this.form.controls.password.touched && this.form.controls.password.dirty && this.form.controls.password.invalid;
  }
  public onSubmit() {
    console.log(this.form)
    const enteredEmail = this.form.value.email;
    const enteredPassword = this.form.value.password;
    console.log(enteredEmail, enteredPassword)
  }
}
