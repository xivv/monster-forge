import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MonsterComponent } from './view/monster/monster.component';
import { MonsterListingComponent } from './view/monster-listing/monster-listing.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { FooterComponent } from './layout/footer/footer.component';
import { LoginComponent } from './auth/login/login.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from 'src/environments/environment.prod';
import { RegisterComponent } from './auth/register/register.component';
import { RecaptchaModule } from 'ng-recaptcha';
import { MyMonsterComponent } from './view/my-monster/my-monster.component';
import { MonsterCreationComponent } from './create/monster-creation/monster-creation.component';
import { HomeComponent } from './layout/home/home.component';

import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { ProfileComponent } from './view/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    MonsterComponent,
    MonsterListingComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    MyMonsterComponent,
    MonsterCreationComponent,
    HomeComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseconfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    RecaptchaModule,
    Ng4LoadingSpinnerModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
