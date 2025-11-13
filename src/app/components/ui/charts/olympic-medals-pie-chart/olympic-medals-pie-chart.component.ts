import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import Chart from 'chart.js/auto';
import { Olympic } from 'src/app/models/olympic';

@Component({
  selector: 'app-olympic-medals-pie-chart',
  standalone: true,
  imports: [],
  templateUrl: './olympic-medals-pie-chart.component.html',
  styleUrls: ['./olympic-medals-pie-chart.component.scss']
})
export class OlympicMedalsPieChartComponent implements OnInit {
  @Input() data: Olympic[] = [];
  
  
  private chart: Chart | undefined;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.buildPieChart();
  }

   ngOnChanges(changes: SimpleChanges): void {
    if ((changes['labels'] || changes['data']) && !(changes['labels']?.firstChange && changes['data']?.firstChange)) {
      this.buildPieChart();
    }
  }

  buildPieChart() {
    const canvas = document.getElementById('olympicMedalsPieChart') as HTMLCanvasElement;
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

    this.chart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [{
          label: 'Total Medals',
          data: medals,
          backgroundColor: [
            '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'
          ]
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'top' },
          title: { display: true, text: 'Olympic Medals Distribution by Country' }
        },
        onClick: (event, elements) => {
          if (elements.length > 0) {
            const index = elements[0].index; // index de la part du graphique cliquée
            const countryName = labels[index];
            this.router.navigate(['/country', countryName]);
          }
        }
      }
    });
  }
}
