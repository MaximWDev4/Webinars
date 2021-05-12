import { Component, OnInit } from '@angular/core';
import {HttpResponse} from '@angular/common/http';
import {RegUser, User} from '../../_models/user';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../_services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})


export class LoginComponent implements OnInit {
  submitted: boolean = false;
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

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/']);
    }
    // creating logIn form
    this.loginForm = this.fb.group({
      // input login validator
      email: ['', [Validators.required, Validators.pattern('^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$')]],
      // input password validator
      password: ['', [Validators.required]],
      // input remember me checkbox
      RME: ['0']
    });
    this.returnUrl = this.route.snapshot.queryParams[`returnUrl`] || '/';
  }

  get f() {
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
  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    const formData = this.loginForm.value;
    this.loading = true;
    this.authService.loginUser(formData).subscribe(
      result => {
        if (result.success) {
          if (result.hasProfile) {
            this.router.navigate([this.returnUrl]);
          } else {
            this.router.navigate(['/profile']);
          }
        } else {
          alert(result.message);
        }
        this.loading = false;
      });
  }
}