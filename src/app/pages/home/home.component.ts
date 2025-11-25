import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Component, OnDestroy, OnInit} from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Olympic } from 'src/app/models/olympic';
import { DataService } from 'src/app/services/data.service';
import { ResponsiveService } from 'src/app/services/responsive.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],

})
export class HomeComponent implements OnInit , OnDestroy {
  olympics$!: Observable<Olympic[]>;
   totalJOs$!: Observable<number>;
  medalsByCountry$!: Observable<{ labels: string[], data: number[] }>;

  size!: 'small' | 'medium' | 'large';
  isMobile = false;
  orientation!: 'portrait' | 'landscape';
  private destroy$ = new Subject<void>();

  constructor(
    private dataService: DataService,
    private responsiveService: ResponsiveService

  ) {}
  

  ngOnInit() {

  //Responsive
   this.responsiveService.size$
      .pipe(takeUntil(this.destroy$))
      .subscribe(size => this.size = size);

    this.responsiveService.isMobile$
      .pipe(takeUntil(this.destroy$))
      .subscribe(isMob => this.isMobile = isMob);

    this.responsiveService.orientation$
      .pipe(takeUntil(this.destroy$))
      .subscribe(o => this.orientation = o);

 // Data Olympics
  this.olympics$ = this.dataService.getDataOlympics();
  this.totalJOs$ = this.dataService.getTotalJOs();
  this.medalsByCountry$ = this.dataService.getMedalsByCountry();
}
ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

