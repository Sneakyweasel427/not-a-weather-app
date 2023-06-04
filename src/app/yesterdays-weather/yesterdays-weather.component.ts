import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { lastValueFrom } from 'rxjs';

import { WeatherService } from '../services/weather.service';
import { UserDataModel } from '../models/user-data.model';
import { WeatherModel } from '../models/weather.model';

@Component({
  selector: 'app-yesterdays-weather',
  templateUrl: './yesterdays-weather.component.html',
  styleUrls: ['./yesterdays-weather.component.scss']
})
export class YesterdaysWeatherComponent implements OnInit {

  searchForm: FormGroup;
  yesterdaysWeather: WeatherModel;
  userData: UserDataModel;
  yesterday: string;
  tempUnit: string;
  measurementUnit: string;
  loading = true;
  searching: boolean;
  errorMessage: string;

  constructor(private weatherService: WeatherService, private datePipe: DatePipe, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      city: ['']
    });

    lastValueFrom(this.weatherService.getUserData()).then((userData: UserDataModel) => {
      this.userData = userData;
      if (this.userData.country_code === 'US') {
        this.tempUnit = 'f';
        this.measurementUnit = 'empirical';
      } else {
        this.tempUnit = 'c';
        this.measurementUnit = 'metric';
      }

      const today = new Date(this.userData.localtime_epoch * 1000);
      const yesterday: any = today.setDate(today.getDate() - 1);
      this.yesterday = this.datePipe.transform(yesterday, 'yyyy-MM-dd');
      lastValueFrom(this.weatherService.getYesterdaysWeather(this.userData.city, this.yesterday)).then((res: WeatherModel) => {
        this.yesterdaysWeather = res;
      }).catch((error: any) => {
        console.error(error ? error.error.error.code + ' - ' + error.error.error.message : 'Weather data unavailable');
      }).finally(() => this.loading = false);
    }).catch((error: any) => console.error(error ? error.error.error.code + ' - ' + error.error.error.message : 'User location data unavailable'));
  }

  onTempUnitChange(unit: string) {
    this.tempUnit = unit;
  }

  onMeasurementUnitChange(unit: string) {
    this.measurementUnit = unit;
  }

  searchNewLocation(value) {
    this.searching = true;
    this.errorMessage = '';
    this.searchForm.get('city').disable();
    lastValueFrom(this.weatherService.getYesterdaysWeather(value, this.yesterday)).then((res: WeatherModel) => {
      this.yesterdaysWeather = res;
    }).catch((error: any) => {
      if (error.error.error.code === 1006) {
        this.errorMessage = error.error.error.message;
      } else {
        console.error(error ? error.error.error.code + ' - ' + error.error.error.message : 'Weather data unavailable');
      }
    }).finally(() => {
      this.searchForm.get('city').setValue('');
      this.searchForm.get('city').enable();
      this.searching = false;
    });
  }

}
