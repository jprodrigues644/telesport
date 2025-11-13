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


  this.olympics$ = this.dataService.getDataOlympics();
  this.totalJOs$ = this.dataService.getTotalJOs();
  this.medalsByCountry$ = this.dataService.getMedalsByCountry();
}

}

