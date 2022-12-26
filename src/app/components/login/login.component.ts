import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  showError = false;
  showOk = false;
  constructor(public auth: AuthService) {}
  submitForm() {
    if (!this.form.valid) {
      this.showError = true;
      return;
    }
    this.showError = false;
    let email = this.form.get('email')!.value!;
    let pass = this.form.get('password')!.value!;
    this.auth.login(email, pass);
    this.showOk = true;
    this.form.reset();
  }

  ngOnInit(): void {}
}
