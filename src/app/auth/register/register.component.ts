import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    public authService: AuthService) { }

  registerForm: FormGroup;
  get f() { return this.registerForm.controls; }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.minLength(6), Validators.required]],
      repeatPassword: ['', [Validators.minLength(6), Validators.required]]
    });
  }

  onSubmit() {

    if (this.registerForm.invalid) {
      return;
    }

    if (this.f.password.value !== this.f.repeatPassword.value) {
      return;
    }

    this.authService.emailSignUp(this.f.email.value, this.f.password.value);
  }

}
