import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class Weather {
  private http = inject(HttpClient);

  getWeather(lat: number, lon: number): Observable<any> {
    const url = `http://localhost:8000/api/weather/?lat=${lat}&lon=${lon}`;
    return this.http.get<any>(url).pipe(
      map(data => data),
      catchError(() => of(null))
    );
  }

  getCity(lat: number, lon: number): Observable<any> {
    const url = `http://localhost:8000/api/city/?lat=${lat}&lon=${lon}`;
    return this.http.get<any>(url).pipe(
      catchError(() => of({ address: { city: 'Nieznana lokalizacja' } }))
    );
  }
}