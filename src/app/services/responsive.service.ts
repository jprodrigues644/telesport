import { Injectable, OnDestroy } from '@angular/core';
import { map, Subject, takeUntil } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

/**
 * ResponsiveService monitors screen size and orientation changes,
 * providing observable streams to adapt the UI accordingly.
 */

@Injectable({
  providedIn: 'root'
})
export class ResponsiveService implements OnDestroy {
 /* Subject to manage unsubscription and prevent memory leaks */
  private destroyed$ = new Subject<void>();

  /* Observable streams for size and orientation */

  private sizeSubject = new Subject<'small' | 'medium' | 'large'>();
  size$ = this.sizeSubject.asObservable();
/* Observable stream for orientation */
  private orientationSubject = new Subject<'portrait' | 'landscape'>();
  orientation$ = this.orientationSubject.asObservable();

  /* Observable stream to indicate if the device is mobile */
  isMobile$ = this.size$.pipe(
    map(size => size === 'small')
  );
 
  /* Constructor sets up breakpoint observation and orientation detection
    */
  constructor(private breakpoint : BreakpointObserver)  {
    
    this.breakpoint.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge
    ]).pipe(takeUntil(this.destroyed$))
    .subscribe(result => {

      if (result.breakpoints[Breakpoints.XSmall] || result.breakpoints[Breakpoints.Small]) {
        this.sizeSubject.next('small');
      } else if (result.breakpoints[Breakpoints.Medium]) {
        this.sizeSubject.next('medium');
      } else {
        this.sizeSubject.next('large');
      }
    });
   /* Function to detect current orientation */
      const detectOrientation = () =>
        window.innerHeight > window.innerWidth ? 'portrait' : 'landscape';

      window.addEventListener('resize', () => {
        this.orientationSubject.next(detectOrientation());
      });

      this.orientationSubject.next(detectOrientation());
  }
   

  /** Cleans up subscriptions to prevent memory leaks. */
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
