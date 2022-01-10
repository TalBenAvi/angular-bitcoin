import { Component, OnInit, Input } from '@angular/core';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit {
  @Input() data: any;
  constructor() {}

  ngOnInit(): void {   
    this.data=JSON.parse(this.data)
    const chartId =
      this.data.unit === 'Trade Volume (USD)' ? 'myChart' : 'myChart2';
    const myChart = new Chart(chartId, {
      type: chartId === 'myChart' ? 'bar' : 'line',
      data: {
        labels: this.data.values.map((value) =>
          new Date(value.x * 1000).toLocaleDateString()
        ),
        datasets: [
          {
            label: this.data.name,
            data: this.data.values.map((value) => value.y),
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
}
