import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }

  getUserData() {
    return this.http.get(`${environment.apiUrl}.ip.json?key=${environment.apiKey}&q=auto:ip`);
  }

  getYesterdaysWeather(city: string, date: string | null) {
    return this.http.get(`${environment.apiUrl}history.json?key=${environment.apiKey}&q=${city}&dt=${date}`);
  }
}
