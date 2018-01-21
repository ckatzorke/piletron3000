import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { MainComponent } from './main/main.component';
import { PersonalizeComponent } from './personalize/personalize.component';


const appRoutes: Routes = [
  { path: '', component: MainComponent },
  { path: 'pzn', component: PersonalizeComponent },
  { path: 'about', component: AboutComponent },
  { path: '**', redirectTo: ''}
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
