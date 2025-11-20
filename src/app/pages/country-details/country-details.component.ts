import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Olympic } from 'src/app/models/olympic';
import { DataService } from 'src/app/services/data.service';
import { ResponsiveService } from 'src/app/services/responsive.service';

@Component({
  selector: 'app-country-details',
  templateUrl: './country-details.component.html',
  styleUrls: ['./country-details.component.scss']
})
export class CountryDetailsComponent implements OnInit, OnDestroy {
  country$!: Observable<Olympic | undefined>;
  totalParticipations$!: Observable<number>;
  totalMedals$!: Observable<number>;
  totalAthletes$!: Observable<number>;
  countryIndex$!: Observable<number>;
  countries$!: Observable<string[]>;
  size: 'small' | 'medium' | 'large' = 'large';
  orientation: 'portrait' | 'landscape' = 'portrait';
  private destroyed$ = new Subject<void>();

  constructor(
    private responsive: ResponsiveService,
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService
  ) {}

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  ngOnInit(): void {
    this.responsive.size$
      .pipe(takeUntil(this.destroyed$))
      .subscribe(size => this.size = size);
    this.responsive.orientation$
      .pipe(takeUntil(this.destroyed$))
      .subscribe(o => this.orientation = o);

    // Load country data based on route params
   this.route.params
    .pipe(takeUntil(this.destroyed$))
    .subscribe(params => {
      const rawId = params['id'];

      //
      this.dataService.getCountryNames()
        .pipe(takeUntil(this.destroyed$))
        .subscribe(countries => {
        
          // 
          if (!isNaN(rawId)) {
            const index = Number(rawId) - 1;

            // invalid index → Not Found
            if (index < 0 || index >= countries.length) {
              this.router.navigate(['/not-found']);
              return;
            }

            const countryName = countries[index];
            this.loadCountryData(countryName);
            return;
          }

          // 
          const countryName = rawId;

          if (!countries.includes(countryName)) {
            this.router.navigate(['/not-found']);
            return;
          }

          this.loadCountryData(countryName);
        });
    });
   }


  private loadCountryData(countryName: string): void {
    this.country$ = this.dataService.getDataOlympicByCountry(countryName);
    this.countryIndex$ = this.dataService.getCountryIndex(countryName);
    this.totalParticipations$ = this.dataService.getTotalParticipations(this.country$);
    this.totalMedals$ = this.dataService.getTotalMedals(this.country$);
    this.totalAthletes$ = this.dataService.getTotalAthletes(this.country$);
    this.countries$ = this.dataService.getCountryNames();
  }

  private resetData(): void {
    // Réinitialisez les observables ou les données locales si nécessaire
    this.country$ = new Observable<Olympic | undefined>();
    this.totalParticipations$ = new Observable<number>();
    this.totalMedals$ = new Observable<number>();
    this.totalAthletes$ = new Observable<number>();
    this.countryIndex$ = new Observable<number>();
    this.countries$ = new Observable<string[]>();
  }

  goToPrevCountry(): void {
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

  goToNextCountry(): void {
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

  goBackHome(): void {
    this.router.navigate(['/']);
  }
}
