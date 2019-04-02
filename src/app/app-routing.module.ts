import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MonsterComponent } from './view/monster/monster.component';
import { MonsterListingComponent } from './view/monster-listing/monster-listing.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { MonsterCreationComponent } from './create/monster-creation/monster-creation.component';
import { AuthguardService } from './auth/authguard.service';
import { HomeComponent } from './layout/home/home.component';
import { ProfileComponent } from './view/profile/profile.component';

const routes: Routes = [
  { path: 'monster/:id', component: MonsterComponent },
  { path: 'monster/:id/edit', component: MonsterCreationComponent },
  { path: 'listing/:list', component: MonsterListingComponent },
  { path: 'profile/:userid', component: ProfileComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'create', component: MonsterCreationComponent, canActivate: [AuthguardService] },
  { path: '', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
