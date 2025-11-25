import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Olympic } from 'src/app/models/olympic';
import { DataService } from 'src/app/services/data.service';
import { ResponsiveService } from 'src/app/services/responsive.service';

/** CountryDetailsComponent displays detailed Olympic data for a specific country,
 * allowing navigation between countries and adapting the UI based on device size and orientation.
 */

@Component({
  selector: 'app-country-details',
  templateUrl: './country-details.component.html',
  styleUrls: ['./country-details.component.scss']
})
export class CountryDetailsComponent implements OnInit, OnDestroy {

  /** Observable streams for country-specific Olympic data */
  country$!: Observable<Olympic | undefined>;
  totalParticipations$!: Observable<number>;
  totalMedals$!: Observable<number>;
  totalAthletes$!: Observable<number>;
  countryIndex$!: Observable<number>;
  countries$!: Observable<string[]>;

  /** Responsive UI properties */
  size: 'small' | 'medium' | 'large' = 'large';
  orientation: 'portrait' | 'landscape' = 'portrait';
  /** Subject to manage unsubscription and prevent memory leaks */

  private destroyed$ = new Subject<void>();


 /**
  * Constructor injects necessary services.
  * @param responsive Service to handle responsive UI changes.
  * @param route ActivatedRoute to access route parameters.
  * @param router Router to navigate programmatically.
  * @param dataService Service to fetch Olympic data.
  */
  constructor(
    private responsive: ResponsiveService,
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService
  ) {}


  ngOnInit(): void {
    
    /* Responsive UI subscriptions */
    this.responsive.size$
      .pipe(takeUntil(this.destroyed$))
      .subscribe(size => this.size = size);
    this.responsive.orientation$
      .pipe(takeUntil(this.destroyed$))
      .subscribe(o => this.orientation = o);

    /* Route parameter subscription to load country data */

   this.route.params
    .pipe(takeUntil(this.destroyed$))
    .subscribe(params => {
      const rawId = params['id'];

      /* Fetch country names to validate and load data */
      this.dataService.getCountryNames()
        .pipe(takeUntil(this.destroyed$))
        .subscribe(countries => {
        
          
          if (!isNaN(rawId)) {
            const index = Number(rawId) - 1;

          
            if (index < 0 || index >= countries.length) {
              this.router.navigate(['/not-found']);
              return;
            }

            const countryName = countries[index];
            this.loadCountryData(countryName);
            return;
          }

        
          const countryName = rawId;

          if (!countries.includes(countryName)) {
            this.router.navigate(['/not-found']);
            return;
          }

          this.loadCountryData(countryName);
        });
    });
   }

/** Loads country-specific data based on the provided country name. 
 * @param countryName The name of the country to load data for.
*/
  private loadCountryData(countryName: string): void {
    this.country$ = this.dataService.getDataOlympicByCountry(countryName);
    this.countryIndex$ = this.dataService.getCountryIndex(countryName);
    this.totalParticipations$ = this.dataService.getTotalParticipations(this.country$);
    this.totalMedals$ = this.dataService.getTotalMedals(this.country$);
    this.totalAthletes$ = this.dataService.getTotalAthletes(this.country$);
    this.countries$ = this.dataService.getCountryNames();
  }

  /** Resets all data observables to avoid displaying stale data during navigation. */

  private resetData(): void {
    this.country$ = new Observable<Olympic | undefined>();
    this.totalParticipations$ = new Observable<number>();
    this.totalMedals$ = new Observable<number>();
    this.totalAthletes$ = new Observable<number>();
    this.countryIndex$ = new Observable<number>();
    this.countries$ = new Observable<string[]>();
  }
   

  /** Navigate to the previous country */

  goToPrevCountry(): void {
    // Get current index and countries list
    this.countryIndex$.pipe(takeUntil(this.destroyed$)).subscribe(currentIndex => {
      this.countries$.pipe(takeUntil(this.destroyed$)).subscribe(countries => {
        const prevIndex = currentIndex === 0 ? countries.length - 1 : currentIndex - 1;
        const prevCountry = countries[prevIndex];
        if (prevCountry) {
          this.resetData();
          this.router.navigate(['/country', prevCountry]);
        }
      });
    });
  }

   /** Navigate to the next country */
  goToNextCountry(): void {
    // Get current index and countries list
    this.countryIndex$.pipe(takeUntil(this.destroyed$)).subscribe(currentIndex => {
      this.countries$.pipe(takeUntil(this.destroyed$)).subscribe(countries => {
        const nextIndex = currentIndex === countries.length - 1 ? 0 : currentIndex + 1;
        const nextCountry = countries[nextIndex];
        if (nextCountry) {
          this.resetData();
          this.router.navigate(['/country', nextCountry]);
        }
      });
    });
  }

  /** Navigate back to the home page */
   goBackHome(): void {
    this.router.navigate(['/']);
  }

    /** Cleans up subscriptions to prevent memory leaks. */
    ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

}
