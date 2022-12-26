import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  // form = new FormGroup({
  //   email: new FormControl('', [
  //     Validators.required,
  //     Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
  //   ]),
  //   password: new FormControl('', [
  //     Validators.required,
  //     Validators.minLength(6),
  //   ]),
  //   password2: new FormControl('', [
  //     Validators.required,

  //   ]),
  // },
  // { CustomValidators.MatchValidator('password', 'confirmPassword')});
  form = new FormGroup(
    {
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      password2: new FormControl('', [Validators.required]),
    },
    [CustomValidators.MatchValidator('password', 'password2')]
  );
  showError = false;
  showOk = false;
  constructor(private auth: AuthService) {}

  ngOnInit(): void {}
  submitForm() {
    if (!this.form.valid) {
      this.showError = true;
      return;
    }
    let email = this.form.get('email')!.value!;
    let pass = this.form.get('password')!.value!;
    this.showError = false;
    this.auth.register(email, pass);
    this.showOk = true;
    this.form.reset();
  }
}
export class CustomValidators {
  static MatchValidator(source: string, target: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const sourceCtrl = control.get(source);
      const targetCtrl = control.get(target);

      return sourceCtrl && targetCtrl && sourceCtrl.value !== targetCtrl.value
        ? { mismatch: true }
        : null;
    };
  }
}
