import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './header/header.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { PokemonListModule } from './pokemon-list/pokemon-list.module';
import { RouterModule } from '@angular/router';
import { PokemonViewModule } from './pokemon-list/pokemon-view/pokemon-view.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    DashboardModule,
    BrowserModule,
    HttpClientModule,
    PokemonListModule,
    RouterModule,
    PokemonViewModule
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
