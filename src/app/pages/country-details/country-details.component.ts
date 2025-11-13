import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';
import { Olympic } from 'src/app/models/olympic';
import { Participation } from 'src/app/models/participation';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-country-details',
  templateUrl: './country-details.component.html',
  styleUrls: ['./country-details.component.scss']
})
export class CountryDetailsComponent implements OnInit {
  country$!: Observable<Olympic | undefined>;
  totalParticipations$!: Observable<number>;
  totalMedals$!: Observable<number>;
  totalAthletes$!: Observable<number>;
  countryIndex$!: Observable<number>;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    const countryName = this.route.snapshot.paramMap.get('id')!;
    this.country$ = this.dataService.getDataOlympicByCountry(countryName);
    this.countryIndex$ = this.dataService.getCountryIndex(countryName);

    this.totalParticipations$ = this.country$.pipe(
      map((country) => country?.participations.length || 0)
    );

    this.totalMedals$ = this.country$.pipe(
      map((country) =>
        country
          ? country.participations.reduce((sum, p) => sum + p.medalsCount, 0)
          : 0
      )
    );

    this.totalAthletes$ = this.country$.pipe(
      map((country) =>
        country
          ? country.participations.reduce((sum, p) => sum + p.athleteCount, 0)
          : 0
      )
    );
  }
}
