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
import { SearchService } from './main/search/search.service';
import { SearchresultComponent } from './main/search/searchresult/searchresult.component';
import { PileService } from './main/pile/pile.service';
import { PileComponent } from './main/pile/pile.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    AboutComponent,
    MainComponent,
    SearchComponent,
    SearchresultComponent,
    PileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    SearchService,
    PileService,
    { provide: 'WINDOW', useFactory: getWindow }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
export function getWindow() {
  return (typeof window !== 'undefined') ? window : null;
}
