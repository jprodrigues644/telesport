import { Component, Input, OnInit, OnChanges, SimpleChanges, AfterViewInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { Participation } from 'src/app/models/participation';


/** CountryMedalsBarChartComponent displays a bar chart of medals won by a country over different Olympic years.
 * It adapts to changes in input data, country index, and responsive UI properties.
  */

@Component({
  selector: 'app-country-medals-bar-chart',
  standalone: true,
  templateUrl: './country-medals-bar-chart.component.html',
  styleUrls: ['./country-medals-bar-chart.component.scss']
})
export class CountryMedalsBarChartComponent implements OnInit, OnChanges, AfterViewInit {
  /** Input data for the chart */
  @Input() data: Participation[] = [];
  @Input() countryIndex: number = 0;
  @Input() isMobile: boolean = false;
  @Input() orientation: 'portrait' | 'landscape' = 'portrait';

 /** Reference to the Chart.js instance */
  private chart: Chart | undefined;
  
  private countryColors: string[] = [
  '#8B4789',  
  '#7BA3C7',  
  '#A27B94',  
  '#8BAFB8',  
  '#B8A8A0'   
];

/** Flag to track if the view has been initialized */
  private viewInitialized = false;

  ngOnInit(): void {
    
  }

  /** Builds the bar chart after the view has been initialized */
  ngAfterViewInit(): void {
    this.viewInitialized = true;
   
    setTimeout(() => {
      this.buildBarChart();
    });
  }

  /** Rebuilds the bar chart when input properties change
   * @param changes The changes detected in input properties.
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (this.viewInitialized && (changes['data'] || changes['countryIndex'] || changes['isMobile'] || changes['orientation'])) {
      setTimeout(() => {
        this.buildBarChart();
      });
    }
  }

  /** Gets the background color for the current country index 
   * @return The background color as a string.
  */

  private getBackgroundColor(): string {
    return this.countryColors[this.countryIndex % this.countryColors.length];
  }
/** Gets the border color for the current country index 
 * Returns a darker shade of the background color.
 * @return The border color as a string.
*/
  private getBorderColor(): string {
    const color = this.getBackgroundColor();
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, 1)`;
  }

  /** Builds the bar chart using Chart.js */
  buildBarChart(): void {
  const canvasId = `countryMedalsBarChart-${this.countryIndex}`;
  const canvas = document.getElementById(canvasId) as HTMLCanvasElement;

  if (!canvas) {
    console.error('Canvas not found with id:', canvasId);
    return;
  }

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    console.error('Context not found');
    return;
  }

  if (this.chart) {
    this.chart.destroy();
  }

  const years = this.data.map(i => i.year);
  const medals = this.data.map(i => i.medalsCount);
 /* Create bar chart */
  this.chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: years,
      datasets: [{
        label: 'Medals Count',
        data: medals,
        backgroundColor: this.getBackgroundColor(),
        borderColor: this.getBorderColor(),
        borderWidth: 1,
        barPercentage: 0.6,      
        categoryPercentage: 0.8   
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Number of Medals'
          }
        },
        x: {
          title: {
            display: true,
            text: 'Year'
          }
        }
      },
      plugins: {
        legend: {
          display: true,
          position: 'top'
        }
      }
    }
  });
}
}