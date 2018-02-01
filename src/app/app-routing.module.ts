import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { MainComponent } from './main/main.component';
import { PersonalizeComponent } from './personalize/personalize.component';
import { MyPileComponent } from './mypile/mypile.component';


const appRoutes: Routes = [
  { path: 'main', pathMatch: 'full', component: MainComponent },
  { path: 'mypile', pathMatch: 'full', component: MyPileComponent },
  { path: 'pzn', pathMatch: 'full', component: PersonalizeComponent },
  { path: 'about', pathMatch: 'full', component: AboutComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'main' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
