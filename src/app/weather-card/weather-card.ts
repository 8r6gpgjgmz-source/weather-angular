import { Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-weather-card',
  imports: [MatCardModule],
  templateUrl: './weather-card.html',
  styleUrl: './weather-card.css',
})
export class WeatherCard {
  cityName = input<string>('');
  temperature = input<number>(0);
  description = input<string>('');
  weatherIcon = input<string>('');
  dateTime = input<string>('');
  forecast = input<{ time: string; icon: string; temp: number }[]>([]);
}