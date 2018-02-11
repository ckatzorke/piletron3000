import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { MainComponent } from './main/main.component';
import { ProfileComponent } from './profile/profile.component';
import { MyPileComponent } from './mypile/mypile.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { PznGuard } from './shared/pzn.guard';


const appRoutes: Routes = [
  { path: 'home', pathMatch: 'full', component: WelcomeComponent },
  { path: 'main', pathMatch: 'full', component: MainComponent, canActivate: [PznGuard] },
  { path: 'mypile', pathMatch: 'full', component: MyPileComponent, canActivate: [PznGuard] },
  { path: 'profile', pathMatch: 'full', component: ProfileComponent, canActivate: [PznGuard] },
  { path: 'about', pathMatch: 'full', component: AboutComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'home' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
