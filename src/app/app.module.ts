import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AboutComponent } from './about/about.component';
import { MainComponent } from './main/main.component';
import { AppRoutingModule } from './app-routing.module';
import { SearchComponent } from './main/search/search.component';
import { HLTBSearchService } from './main/search/hltbsearch.service';
import { SearchresultComponent } from './main/search/searchresult/searchresult.component';
import { PileService } from './main/pile/pile.service';
import { PileComponent } from './main/pile/pile.component';
import { ProfileComponent } from './profile/profile.component';
import { MyPileComponent } from './mypile/mypile.component';

import { SigninGuard } from './shared/signin.guard';
import { UserService } from './shared/user.service';
import { UserResolver } from './shared/user-resolver.service';

import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { ProfileResolver } from './shared/profile-resolver.service';
import { AlternativeService } from './shared/alternative.service';
import { ImprintComponent } from './imprint/imprint.component';
import { PrivacyComponent } from './privacy/privacy.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    AboutComponent,
    MainComponent,
    SearchComponent,
    SearchresultComponent,
    PileComponent,
    ProfileComponent,
    MyPileComponent,
    ImprintComponent,
    PrivacyComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule
  ],
  providers: [
    HLTBSearchService,
    UserService,
    PileService,
    AlternativeService,
    SigninGuard,
    UserResolver,
    ProfileResolver,
    { provide: 'WINDOW', useFactory: getWindow }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
export function getWindow() {
  return (typeof window !== 'undefined') ? window : null;
}
