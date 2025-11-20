import { Component, OnDestroy, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true, 
  imports: [CommonModule]
})
export class HeaderComponent implements OnInit, OnDestroy {
  private destroyed$ = new Subject<void>();
  
  // Taille et orientation
  size: 'small' | 'medium' | 'large' = 'large';
  orientation: 'portrait' | 'landscape' = 'portrait';
  
  // Logos et images
  telesportLogoPath: string = 'assets/images/telesportLogo.png';
  olympicRingsPath: string = 'assets/images/OlympicRings.png';
  
  // Texte
  title: string = 'Olympic Games';

  constructor() {}

  ngOnInit(): void {
    this.updateResponsive();
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  // Getter pour conditions d'affichage
  get isSmall(): boolean {
    return this.size === 'small';
  }

  get isPortrait(): boolean {
    return this.orientation === 'portrait';
  }

  // Met à jour la taille et orientation
  @HostListener('window:resize')
  updateResponsive() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    // Définition de la taille
    if (width < 768) {
      this.size = 'small';
    } else if (width < 1200) {
      this.size = 'medium';
    } else {
      this.size = 'large';
    }

    // Définition de l'orientation
    this.orientation = height >= width ? 'portrait' : 'landscape';
  }
}
