import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { combineLatest, map, Observable } from 'rxjs';
import { Olympic } from '../models/olympic';

/**
 * DataService handles fetching and processing Olympic data from a JSON source.
 * It provides methods to retrieve various statistics and information about countries' participation in the Olympics.
 */

@Injectable({
  providedIn: 'root'
})
export class DataService {


  private olympicUrl = './assets/mock/olympic.json';

  /** Constructor injects HttpClient for data fetching. */
  constructor(private http: HttpClient) {

   }
   /** Fetches the complete list of Olympic data from the JSON source.
    * @return Observable emitting an array of Olympic data objects.
    */
    getDataOlympics(): Observable<Olympic[]> {
    return this.http.get<Olympic[]>(this.olympicUrl);

  }
/** Fetches Olympic data for a specific country.
 * @param countryName The name of the country to fetch data for.
 * @return Observable emitting the Olympic data object for the specified country, or undefined if not found.
 */
  getDataOlympicByCountry(countryName: string): Observable<Olympic | undefined> {
    return this.getDataOlympics().pipe(
      map((olympics: Olympic[]) => olympics.find(olympic => olympic.country === countryName))
    );
  }

  /** Fetches the list of country names from the Olympic data.
   * @return Observable emitting an array of country names.
   */
  getCountryNames(): Observable<string[]> {
    return this.getDataOlympics().pipe(
      map(olympics => olympics.map(olympic => olympic.country))
    ); }

    /** Fetches the index of a specific country in the Olympic data.
     * @param countryName The name of the country to find the index for.
     * @return Observable emitting the index of the country, or 0 if not found.
     */

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

   /** Récupère le total des Jeux Olympiques (JO)
    * @return Observable émettant le nombre total de JO distincts
    */
  getTotalJOs(): Observable<number> {
    return this.getDataOlympics().pipe(
      map(olympics => {
        const years = olympics.flatMap(o => o.participations.map(p => p.year));
        return new Set(years).size;
      })
    );
  }

 /** Récupère le nombre de médailles par pays
  * @return Observable émettant un objet avec les labels des pays et leurs données de médailles
  */
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

  /** Retrieves the total number of participations for a given country.
   * @param country$ Observable emitting the Olympic data for a specific country.
   * @return Observable emitting the total number of participations.
   */
   getTotalParticipations(country$: Observable<Olympic | undefined>): Observable<number> {
    return country$.pipe(
      map(country => country?.participations.length || 0)
    );
  }

  /** Retrieves the total number of medals for a given country.
   * @param country$ Observable emitting the Olympic data for a specific country.
   * @return Observable emitting the total number of medals.
   */
  
  getTotalMedals(country$: Observable<Olympic | undefined>): Observable<number> {
    return country$.pipe(
      map(country => {
        if (!country) return 0;
        return country.participations.reduce((sum, p) => sum + p.medalsCount, 0);
      })
    );
  }

  /** Retrieves the total number of athletes for a given country.
     
   * @param country$ Observable emitting the Olympic data for a specific country.
   * @return Observable emitting the total number of athletes.
   */
  getTotalAthletes(country$: Observable<Olympic | undefined>): Observable<number> {
    return country$.pipe(
      map(country => {
        if (!country) return 0;
        return country.participations.reduce((sum, p) => sum + p.athleteCount, 0);
      })
    );
  }

}
