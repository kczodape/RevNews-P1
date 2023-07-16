import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { IndexComponent } from './components/index/index.component';
import { AuthGuard } from './auth.guard';
import { ProfileComponent } from './components/profile/profile.component';
import { SavedArticlesComponent } from './components/saved-articles/saved-articles.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'index', component: IndexComponent},
  { path: 'profile', component: ProfileComponent,  canActivate: [AuthGuard] },
  { path: 'saved-articles', component: SavedArticlesComponent,  canActivate: [AuthGuard] }, // {path: '**', redirectTo: ''},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
