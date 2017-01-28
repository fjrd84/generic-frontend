import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app.routing.module';

// Services
import { SessionService } from './services/session.service';

// Components
import { AppComponent } from './app.component';
import { HomeComponent } from './main-components/home/home.component';
import { LoginComponent } from './main-components/login/login.component';
import { AuthComponent } from './main-components/auth/auth.component';
import { HallOfFameComponent } from './main-components/hall-of-fame/hall-of-fame.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    AuthComponent,
    HallOfFameComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [SessionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
