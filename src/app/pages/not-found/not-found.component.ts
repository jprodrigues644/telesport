import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ResponsiveService } from 'src/app/services/responsive.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit , OnDestroy{

  size: 'small' | 'medium' | 'large' = 'large';
   private destroy$ = new Subject<void>();

  constructor(private responsive: ResponsiveService) {}
 

  ngOnInit(): void {
    this.responsive.size$.subscribe(s => this.size = s);
  }

   ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
