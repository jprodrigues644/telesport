import { Injectable, OnDestroy } from '@angular/core';
import { map, Subject, takeUntil } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';


@Injectable({
  providedIn: 'root'
})
export class ResponsiveService implements OnDestroy {

  private destroyed$ = new Subject<void>();
  private sizeSubject = new Subject<'small' | 'medium' | 'large'>();
  size$ = this.sizeSubject.asObservable();
  private orientationSubject = new Subject<'portrait' | 'landscape'>();
  orientation$ = this.orientationSubject.asObservable();
  isMobile$ = this.size$.pipe(
    map(size => size === 'small')
  );
  //private
  constructor(private breakpoint : BreakpointObserver)  {
    //Observer for screen size
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
    //Orientation 
      const detectOrientation = () =>
        window.innerHeight > window.innerWidth ? 'portrait' : 'landscape';

      window.addEventListener('resize', () => {
        this.orientationSubject.next(detectOrientation());
      });

      this.orientationSubject.next(detectOrientation());
  }
   

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
