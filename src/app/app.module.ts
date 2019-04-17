import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

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
import { MonsterCreationComponent } from './create/monster-creation/monster-creation.component';
import { HomeComponent } from './layout/home/home.component';

import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { ProfileComponent } from './view/profile/profile.component';
import { CreateCompendiumComponent } from './create/create-compendium/create-compendium.component';
import { CompendiumListingComponent } from './view/compendium-listing/compendium-listing.component';
import { CompendiumComponent } from './view/compendium/compendium.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

@NgModule({
  declarations: [
    AppComponent,
    MonsterComponent,
    MonsterListingComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    MonsterCreationComponent,
    HomeComponent,
    ProfileComponent,
    CreateCompendiumComponent,
    CompendiumListingComponent,
    CompendiumComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseconfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    RecaptchaModule,
    Ng4LoadingSpinnerModule.forRoot(),
    NgMultiSelectDropDownModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
