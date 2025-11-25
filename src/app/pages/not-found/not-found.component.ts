import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ResponsiveService } from 'src/app/services/responsive.service';

/** NotFoundComponent displays a user-friendly message when a requested page is not found,
 * adapting the UI based on device size.
 */
@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit , OnDestroy{

  /** Responsive UI property for size */
  size: 'small' | 'medium' | 'large' = 'large';
  /** Subject to manage unsubscription and prevent memory leaks */
   private destroy$ = new Subject<void>();

   /** Constructor injects ResponsiveService */
  constructor(private responsive: ResponsiveService) {}
 

  ngOnInit(): void {
    this.responsive.size$.subscribe(s => this.size = s);
  }

  /** Cleans up subscriptions to prevent memory leaks. */
   ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
