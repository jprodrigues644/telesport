import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Component, OnDestroy, OnInit} from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Olympic } from 'src/app/models/olympic';
import { DataService } from 'src/app/services/data.service';
import { ResponsiveService } from 'src/app/services/responsive.service';

/**
 * HomeComponent manages the display of Olympic data and adapts the UI
 * based on device size and orientation.
 */

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],

})
export class HomeComponent implements OnInit , OnDestroy {
   

  olympics$!: Observable<Olympic[]>;

/** Stream total of JOs to be used in the template */  
   totalJOs$!: Observable<number>;

  /** Stream medals by country to be used in the template */

  medalsByCountry$!: Observable<{ labels: string[], data: number[] }>;

  /** Responsive UI properties  */

  size!: 'small' | 'medium' | 'large';
  isMobile = false;
  orientation!: 'portrait' | 'landscape';

 /* * Subject to manage unsubscription and prevent memory leaks */
  private destroy$ = new Subject<void>();

 /**
  * Constructor injects necessary services.
  * @param dataService Service to fetch Olympic data.
  * @param responsiveService Service to handle responsive UI changes.
  * 
  */
  constructor(
    private dataService: DataService,
    private responsiveService: ResponsiveService

  ) {}
  
/** Initializes the component by setting up subscriptions and fetching data. */
  ngOnInit() {

  // Responsive UI subscriptions
   this.responsiveService.size$
      .pipe(takeUntil(this.destroy$))
      .subscribe(size => this.size = size);

    this.responsiveService.isMobile$
      .pipe(takeUntil(this.destroy$))
      .subscribe(isMob => this.isMobile = isMob);

    this.responsiveService.orientation$
      .pipe(takeUntil(this.destroy$))
      .subscribe(o => this.orientation = o);

  // Fetching data streams
  this.olympics$ = this.dataService.getDataOlympics();
  this.totalJOs$ = this.dataService.getTotalJOs();
  this.medalsByCountry$ = this.dataService.getMedalsByCountry();
}

/** Cleans up subscriptions to prevent memory leaks. */

ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

