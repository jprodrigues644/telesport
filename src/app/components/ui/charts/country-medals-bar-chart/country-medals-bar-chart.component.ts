import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import Chart from 'chart.js/auto';
import { Participation } from 'src/app/models/participation';

@Component({
  selector: 'app-country-medals-bar-chart',
  standalone: true,
  templateUrl: './country-medals-bar-chart.component.html',
  styleUrls: ['./country-medals-bar-chart.component.scss']
})
export class CountryMedalsBarChartComponent implements OnInit, OnChanges {
  @Input() data: Participation[] = [];
  @Input() countryIndex: number = 0;

  private chart: Chart | undefined;
  private countryColors: string[] = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'];

  ngOnInit(): void {
    this.BuildBarChart();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // 🔁 Quand l'index du pays change, on reconstruit le graphique
    if (changes['countryIndex'] && !changes['countryIndex'].firstChange) {
      this.BuildBarChart();
    }
  }

  private getBackgroundColor(): string {
    return this.countryColors[this.countryIndex % this.countryColors.length];
  }

  private getBorderColor(): string {
    const color = this.getBackgroundColor();
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, 1)`;
  }

  BuildBarChart(): void {
    const canvasId = `countryMedalsBarChart-${this.countryIndex}`;
    let canvas = document.getElementById(canvasId) as HTMLCanvasElement;

    if (!canvas) {
      // Si le canvas n’existe pas encore, on le crée
      const container = document.querySelector('.chart-container');
      if (!container) return;
      container.innerHTML = `<canvas id="${canvasId}"></canvas>`;
      canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (this.chart) this.chart.destroy();

    const years = this.data.map(i => i.year);
    const medals = this.data.map(i => i.medalsCount);

    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: years,
        datasets: [{
          label: 'Medals Count',
          data: medals,
          backgroundColor: this.getBackgroundColor(),
          borderColor: this.getBorderColor(),
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            title: { display: true, text: 'Number of Medals' }
          },
          x: {
            title: { display: true, text: 'Year' }
          }
        }
      }
    });
  }
}
