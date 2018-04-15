import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { MainComponent } from './main/main.component';
import { ProfileComponent } from './profile/profile.component';
import { MyPileComponent } from './mypile/mypile.component';
import { SigninGuard } from './shared/signin.guard';
import { UserResolver } from './shared/user-resolver.service';
import { ProfileResolver } from './shared/profile-resolver.service';
import { ImprintComponent } from './imprint/imprint.component';
import { PrivacyComponent } from './privacy/privacy.component';


const appRoutes: Routes = [
  {
    path: 'main', pathMatch: 'full', component: MainComponent
  },
  {
    path: 'mypile', pathMatch: 'full', component: MyPileComponent, canActivate: [SigninGuard], resolve: { profile: ProfileResolver }
  },
  {
    path: 'profile', pathMatch: 'full', component: ProfileComponent, canActivate: [SigninGuard], resolve: {
      user: UserResolver, profile: ProfileResolver
    }
  },
  { path: 'about', pathMatch: 'full', component: AboutComponent },
  { path: 'imprint', pathMatch: 'full', component: ImprintComponent },
  { path: 'privacy', pathMatch: 'full', component: PrivacyComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'main' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
