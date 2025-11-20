import { Component, OnInit } from '@angular/core';
import { ResponsiveService } from 'src/app/services/responsive.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {

  size: 'small' | 'medium' | 'large' = 'large';

  constructor(private responsive: ResponsiveService) {}

  ngOnInit(): void {
    this.responsive.size$.subscribe(s => this.size = s);
  }
}
