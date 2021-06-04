import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Global } from './_models/global';
import {BrowserModule} from '@angular/platform-browser';
import { PageNotFoundComponent } from './views/page-not-found/page-not-found.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {LoginComponent} from './views/login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {AuthGuard} from './_helpers/auth.guard';
import {ErrorInterceptor} from './_helpers/error.interceptor';
import {JwtInterceptor} from './_helpers/jwt.interceptor';
import {RoleGuardService} from './_services/licence-guars.service';
import {SvgModule} from '../svg/svg.module';
import {SignUpComponent} from './views/sign-up/sign-up.component';
import { ModalContentComponent } from './components/modal-content/modal-content.component';
import { ConformEmailComponent } from './views/conform-email/conform-email.component';
import {ToastModule} from './components/toast/toast.module';
import {ErrorService} from './_services/error.service';
import {InfoService} from './_services/info.service';
import {SuccessService} from './_services/success.service';
import { WebinarGuestAuthComponent } from './views/webinar-guest-auth/webinar-guest-auth.component';
import {UserService} from './_services/user.service';
import {WebinarService} from './_services/webinar.service';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    LoginComponent,
    SignUpComponent,
    ModalContentComponent,
    ConformEmailComponent,
    WebinarGuestAuthComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        HttpClientModule,
        SvgModule,
        FormsModule,
        ToastModule
    ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    JwtInterceptor,
    RoleGuardService,
    Global,
    HttpClient,
    AuthGuard,
    ErrorService,
    InfoService,
    SuccessService,
    UserService,
    WebinarService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
