import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RegUser} from '../../_models/user';
import {AuthService} from '../../_services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  submitted = false;
  public reguser: RegUser = {
    emailreg: '',
    passwordreg: '',
  };

  public loginForm: FormGroup;
  private returnUrl: string;
  public loading;

  constructor(private authService: AuthService,
              private fb: FormBuilder,
              private router: Router,
              private route: ActivatedRoute
  ) {
  }


  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/']);
    }
    // creating logIn form
    this.loginForm = this.fb.group({
      // input login validator
      email: ['', [Validators.required, Validators.pattern('^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$')]],
      // input password validator
      password: ['', [Validators.required]],
      // input name
      name: ['', [Validators.required, Validators.pattern('^[a-zA-ZА-Яа-я\\s]+$')]]
    });
    this.returnUrl = this.route.snapshot.queryParams[`returnUrl`] || '/';
  }

  get f(): any {
    return this.loginForm.controls;
  }

  isInvalid( attr: string): any {
    return (this.loginForm.get(attr).touched
      || this.loginForm.get(attr).dirty
      || this.submitted)
      && this.loginForm.get(attr).errors;
  }

  getErrors(attr: string): any {
    return this.loginForm.get(attr).errors;
  }

// sending logIn form
  onSubmit(): void {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    const formData = this.loginForm.value;
    this.loading = true;
    this.authService.registerUser(formData).subscribe(
      result => {
        if (result.success) {
          this.router.navigate([this.returnUrl]);
        } else {
          alert(result.message);
        }
        this.loading = false;
      });
  }
}
