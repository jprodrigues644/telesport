import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    private router: Router,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    const countryName = this.route.snapshot.paramMap.get('id')!;
    this.country$ = this.dataService.getDataOlympicByCountry(countryName);
    this.countryIndex$ = this.dataService.getCountryIndex(countryName);

  this.totalParticipations$ = this.dataService.getTotalParticipations(this.country$);
    this.totalMedals$ = this.dataService.getTotalMedals(this.country$);
    this.totalAthletes$ = this.dataService.getTotalAthletes(this.country$);
    this.countryIndex$ = this.dataService.getCountryIndex(countryName);
  }

   goBackHome(): void {
    this.router.navigate(['/']);
  }
}
