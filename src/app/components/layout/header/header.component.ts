import { Component, OnDestroy, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';

/** HeaderComponent manages the display of the application header,
 * including logos and responsive behavior based on window size and orientation.
 */
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true, 
  imports: [CommonModule]
})
export class HeaderComponent implements OnInit, OnDestroy {
  private destroyed$ = new Subject<void>();
  
 /** Responsive UI properties */
  size: 'small' | 'medium' | 'large' = 'large';
  orientation: 'portrait' | 'landscape' = 'portrait';
  
 /* Image paths */
  telesportLogoPath: string = 'assets/images/telesportLogo.png';
  olympicRingsPath: string = 'assets/images/OlympicRings.png';

  /* Header  title */
  title: string = 'Olympic Games';

  constructor() {}

  /** Initializes the component by setting up responsive properties. */
  ngOnInit(): void {
    this.updateResponsive();
  }

  /** Cleans up subscriptions to prevent memory leaks. */
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }


  get isSmall(): boolean {
    return this.size === 'small';
  }

  
  get isPortrait(): boolean {
    return this.orientation === 'portrait';
  }

  /** Updates responsive properties based on window size and orientation 
   * Triggered on window resize events.
  */
  @HostListener('window:resize')
  updateResponsive() {
    const width = window.innerWidth;
    const height = window.innerHeight;

   
    if (width < 768) {
      this.size = 'small';
    } else if (width < 1200) {
      this.size = 'medium';
    } else {
      this.size = 'large';
    }

    
    this.orientation = height >= width ? 'portrait' : 'landscape';
  }
}
