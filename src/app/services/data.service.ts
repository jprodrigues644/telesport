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

   // Récupère le nombre total de JO (années uniques)
  getTotalJOs(): Observable<number> {
    return this.getDataOlympics().pipe(
      map(olympics => {
        const years = olympics.flatMap(o => o.participations.map(p => p.year));
        return new Set(years).size;
      })
    );
  }

  // Récupère le total des médailles par pays (pour le graphique camembert)
  getMedalsByCountry(): Observable<{ labels: string[], data: number[] }> {
    return this.getDataOlympics().pipe(
      map(olympics => {
        const labels = olympics.map(o => o.country);
        const data = olympics.map(o =>
          o.participations.reduce((sum, p) => sum + p.medalsCount, 0)
        );
        return { labels, data };
      })
    );
  }

   getTotalParticipations(country$: Observable<Olympic | undefined>): Observable<number> {
    return country$.pipe(
      map(country => country?.participations.length || 0)
    );
  }

  // Nouvelle méthode pour obtenir le total des médailles
  getTotalMedals(country$: Observable<Olympic | undefined>): Observable<number> {
    return country$.pipe(
      map(country => {
        if (!country) return 0;
        return country.participations.reduce((sum, p) => sum + p.medalsCount, 0);
      })
    );
  }

  // Nouvelle méthode pour obtenir le total des athlètes
  getTotalAthletes(country$: Observable<Olympic | undefined>): Observable<number> {
    return country$.pipe(
      map(country => {
        if (!country) return 0;
        return country.participations.reduce((sum, p) => sum + p.athleteCount, 0);
      })
    );
  }

}
