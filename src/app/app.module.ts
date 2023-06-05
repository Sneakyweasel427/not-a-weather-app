import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { YesterdaysWeatherModule } from './yesterdays-weather/yesterdays-weather.module';
import {CookieService} from 'ngx-cookie-service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    YesterdaysWeatherModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
