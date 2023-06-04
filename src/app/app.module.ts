import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { YesterdaysWeatherModule } from './yesterdays-weather/yesterdays-weather.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    YesterdaysWeatherModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }