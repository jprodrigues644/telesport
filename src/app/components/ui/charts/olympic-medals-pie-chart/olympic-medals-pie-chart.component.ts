import { Component, ElementRef, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import Chart from 'chart.js/auto';
import { Olympic } from 'src/app/models/olympic';


/** OlympicMedalsPieChartComponent displays a pie chart of Olympic medals distribution by country.
 * It allows navigation to country details upon clicking a chart segment.
 */
@Component({
  selector: 'app-olympic-medals-pie-chart',
  standalone: true,
  imports: [],
  templateUrl: './olympic-medals-pie-chart.component.html',
  styleUrls: ['./olympic-medals-pie-chart.component.scss']
})
export class OlympicMedalsPieChartComponent implements OnInit {
  /** Input data for the chart */
  @Input() data: Olympic[] = [];
  /** Reference to the canvas element for rendering the chart */
  @ViewChild('chartCanvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;
  
  private chart: Chart | undefined;

  /** Constructor injects Router for navigation */
  constructor(private router: Router) {}

  /** Initializes the pie chart on component initialization */
  ngOnInit(): void {
    this.buildPieChart();
  }

  /** Rebuilds the pie chart when input data changes */
   ngOnChanges(changes: SimpleChanges): void {
    if ((changes['labels'] || changes['data']) && !(changes['labels']?.firstChange && changes['data']?.firstChange)) {
      this.buildPieChart();
    }
  }

  /** Builds the pie chart using Chart.js
   * Navigates to country details on segment click.
   */

  buildPieChart() {
    
    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d');

    const labels = this.data.map(i => i.country);
    const medals = this.data.map(i => i.participations.reduce((acc, p) => acc + p.medalsCount, 0));

    if (!ctx) {
      console.error('Canvas context not found');
      return;
    }

    if (this.chart) {
      this.chart.destroy();
    }
  /* Create pie chart */

    this.chart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [{
          label: 'Total Medals',
          data: medals,
          backgroundColor: [
        '#8B4789',  
        '#7BA3C7',  
        '#A27B94',  
        '#8BAFB8',  
        '#B8A8A0'   
      ]
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'top' },
          title: { display: true, text: 'Olympic Medals Distribution by Country' }
        },
        /**Handle click events on chart segments  */ 

        onClick: (event, elements) => {
          if (elements.length > 0) {
            const index = elements[0].index; 
            const countryName = labels[index];
            this.router.navigate(['/country', countryName]);
          }
        }
      }
    });
  }
}
