import { Component, OnInit, inject, signal } from '@angular/core';
import { Weather } from '../../weather';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-cities-weather',
  imports: [MatCardModule],
  templateUrl: './cities-weather.html',
  styleUrl: './cities-weather.css',
})
export class CitiesWeather implements OnInit {
  private weatherService = inject(Weather);

  cities = signal<{ city: string; temperature: number; weathercode: number }[]>([]);

  private weatherIcons: Record<number, string> = {
    0: '☀️', 1: '🌤️', 2: '⛅', 3: '☁️', 45: '🌫️', 48: '🌫️',
    51: '🌦️', 53: '🌦️', 55: '🌧️', 61: '🌧️', 63: '🌧️', 65: '🌧️',
    71: '🌨️', 73: '🌨️', 75: '❄️', 80: '🌦️', 81: '🌧️', 82: '⛈️',
    95: '⛈️', 99: '⛈️'
  };

  ngOnInit(): void {
    this.weatherService.getCitiesWeather().subscribe(data => {
      this.cities.set(data);
    });
  }

  getIcon(code: number): string {
    return this.weatherIcons[code] ?? '🌡️';
  }
}