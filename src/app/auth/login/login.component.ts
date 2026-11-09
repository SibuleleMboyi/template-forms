import {afterNextRender, Component, DestroyRef, inject, viewChild} from '@angular/core';
import {FormsModule, NgForm} from "@angular/forms";
import {debounceTime} from "rxjs";

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [
    FormsModule
  ]
})
export class LoginComponent {
  private form = viewChild<NgForm>('form')
  private destroyRef = inject(DestroyRef)

  constructor() {
    // The form is fully initialised after rendering
    afterNextRender(() => {
      const subscription$ = this.form()
        ?.valueChanges
        ?.pipe(debounceTime(500))
        .subscribe({
        next: (value) =>
          window.localStorage.setItem('saved-login-form', JSON.stringify({email: value.email}))
      });

      this.destroyRef.onDestroy(() => subscription$?.unsubscribe())
    })
  }
  public onSubmit(formData: NgForm) {
    if(formData.form.invalid) {
      return;
    }
    const enteredEmail = formData.form.value.email;
    const enteredPassword = formData.form.value.password;

    console.log(enteredEmail)
    console.log(enteredPassword)

    formData.form.reset();
  }
}
