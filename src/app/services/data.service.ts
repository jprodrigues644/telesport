import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { combineLatest, map, Observable } from 'rxjs';
import { Olympic } from '../models/olympic';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private olympicUrl = './assets/mock/olympic.json';

  constructor(private http: HttpClient) {

   }

    getDataOlympics(): Observable<Olympic[]> {
    return this.http.get<Olympic[]>(this.olympicUrl);

  }

  getDataOlympicByCountry(countryName: string): Observable<Olympic | undefined> {
    return this.getDataOlympics().pipe(
      map((olympics: Olympic[]) => olympics.find(olympic => olympic.country === countryName))
    );
  }

  getCountryNames(): Observable<string[]> {
    return this.getDataOlympics().pipe(
      map(olympics => olympics.map(olympic => olympic.country))
    ); }

   getCountryIndex(countryName: string | undefined): Observable<number> {
  return this.getDataOlympics().pipe(
    map(olympics => {
      if (!countryName) return 0;
      const cleanName = countryName.trim().toLowerCase();
      const index = olympics.findIndex(o => o.country.trim().toLowerCase() === cleanName);
      return index >= 0 ? index : 0;
    })
  );

}

}
