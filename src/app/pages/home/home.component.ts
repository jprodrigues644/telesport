import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import Chart from 'chart.js/auto';
import { Observable } from 'rxjs';
import { Olympic } from 'src/app/models/olympic';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],

})
export class HomeComponent implements OnInit {
  olympics$!: Observable<Olympic[]>;
   totalJOs$!: Observable<number>;
  medalsByCountry$!: Observable<{ labels: string[], data: number[] }>;

  constructor(private dataService: DataService) {}

  ngOnInit() {

  //   // Lack of strict typing 
  //  // this.http.get<any[]>(this.olympicUrl).pipe().subscribe(
  //     (data) => {

  //       // Console log , must be deleted later
  //       console.log(`Liste des données : ${JSON.stringify(data)}`);
  //       if (data && data.length > 0) {
  //         this.totalJOs = Array.from(new Set(data.map((i: any) => i.participations.map((f: any) => f.year)).flat())).length;
  //         const countries: string[] = data.map((i: any) => i.country);
  //         this.totalCountries = countries.length;
  //         const medals = data.map((i: any) => i.participations.map((i: any) => (i.medalsCount)));
  //         const sumOfAllMedalsYears = medals.map((i) => i.reduce((acc: any, i: any) => acc + i, 0));
  //         this.buildPieChart(countries, sumOfAllMedalsYears);
  //       }
  //     },
  //     (error:HttpErrorResponse) => {
  //       console.log(`erreur : ${error}`);
  //       this.error = error.message
  //     }
  //   )
  // }
  this.olympics$ = this.dataService.getDataOlympics();
  this.totalJOs$ = this.dataService.getTotalJOs();
  this.medalsByCountry$ = this.dataService.getMedalsByCountry();
}

}

