import { Component, OnInit, signal, inject } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
	private http = inject(HttpClient);		
	
  cityName = signal('Ładowanie...');
  temperature = signal(0);
  description = signal('');
  dateTime = signal('');
  weatherIcon = signal('');

  private weatherDescriptions: Record<number, string> = {
	0: 'Bezchmurnie',
	1: 'Przeważnie bezchmurnie',
	2: 'Częściowe zachmurzenie',
	3: 'Zachmurzenie',
	45: 'Mgła',
	48: 'Mgła z szronem',
	51: 'Lekka mżawka',
	53: 'Mżawka',
	55: 'Intensywna mżawka',
	61: 'Lekki deszcz',
	63: 'Deszcz',
	65: 'Intensywny deszcz',
	71: 'Lekki śnieg',
	73: 'Śnieg',
	75: 'Intensywny śnieg',
	80: 'Przelotne opady',
	81: 'Opady',
	82: 'Gwałtowne opady',
	95: 'Burza',
	99: 'Burza z gradem'
  };

  private weatherIcons: Record<number, string> = {
	0: '☀️', 1: '🌤️', 2: '⛅', 3: '☁️',
	45: '🌫️', 48: '🌫️', 51: '🌦️', 53: '🌦️',
	55: '🌧️', 61: '🌧️', 63: '🌧️', 65: '🌧️',
	71: '🌨️', 73: '🌨️', 75: '❄️',
	80: '🌦️', 81: '🌧️', 82: '⛈️',
	95: '⛈️', 99: '⛈️'
  };

  ngOnInit(): void {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
		this.fetchWeather(lat, lon);
	  },
	  () => {
		  this.cityName.set('Nie udało się pobrać lokalizacji.');
      }
    );
  }
  
  fetchWeather(lat: number, lon: number): void {
	  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,weathercode&timezone=auto`;
	  this.http.get<any>(url).subscribe(data => {
		  const times = data.hourly.time;
		  const temperatures = data.hourly.temperature_2m;
		  const weatherCodes = data.hourly.weathercode;
		  
		  const now = new Date();
		  now.setMinutes(0, 0, 0);
		  const currentTimeString = now.toISOString().slice(0,16);
		  
		  const index = times.indexOf(currentTimeString);
		  if (index !== -1) {
			  this.temperature.set(temperatures[index]);
			  const currentCode = weatherCodes[index];
			  this.description.set(this.weatherDescriptions[currentCode]
				?? 'Brak danych');
				this.weatherIcon.set(this.weatherIcons[currentCode] ?? '🌡️');

				const now2 = new Date();
				const options: Intl.DateTimeFormatOptions = {
					weekday: 'long', year: 'numeric', month: 'long',
					day: 'numeric', hour: '2-digit', minute: '2-digit'
				  };

				  this.dateTime.set(now2.toLocaleDateString('pl-PL', options));
		  }
		const geoUrl = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`;
		this.http.get<any>(geoUrl).subscribe(data => {
			this.cityName.set(
				data.address.city || data.address.town || data.address.village || data.address.municipality
			);
		})
	  });
  }
	  
}