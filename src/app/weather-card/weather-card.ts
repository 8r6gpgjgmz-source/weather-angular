import { Component, input } from '@angular/core';

@Component({
  selector: 'app-weather-card',
  imports: [],
  templateUrl: './weather-card.html',
  styleUrl: './weather-card.css',
})
export class WeatherCard {
  cityName = input<string>('');
  temperature = input<number>(0);
  description = input<string>('');
  weatherIcon = input<string>('');
  dateTime = input<string>('');
}