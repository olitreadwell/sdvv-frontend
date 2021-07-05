import { Component, Input, OnChanges } from '@angular/core';

import { EChartsOption } from 'echarts';

import { getCompactFormattedCurrency } from '../../shared/number-formatter'

@Component({
  selector: 'app-outside-spending-bar',
  templateUrl: './outside-spending-bar.component.html',
  styleUrls: ['./outside-spending-bar.component.scss']
})
export class OutsideSpendingBarComponent implements OnChanges {
  @Input() support: number;
  @Input() oppose: number;
  @Input() backgroundColor: string = 'white';
  @Input() textColor: string = '#4e4e4e';

  mergeOption: EChartsOption = {};

  chartOption: EChartsOption = {
    grid: {
      left: 20,
      top: 10,
      right: 60,
      bottom: 0,
      height: 125,
      containLabel: true,
    },
    xAxis: {
      show: false,
      type: 'log',
      logBase: 2,
    },
    yAxis: {
      type: 'category',
      inverse: true,
      axisTick: {
        show: false
      },
      axisLabel: {
        fontWeight: 'bolder',
      },
    },
    tooltip: {
      show: true,
      trigger: 'item',
      formatter: (params) => `${params.name}: $${(+params.value).toLocaleString()}`,
    },
    series: [{
      type: 'bar',
      label: {
        show: true,
        position: 'right',
        formatter: (params) => getCompactFormattedCurrency(+params['value']),        
        fontWeight: 'bold',
        fontSize: 16,
      },
      barWidth: 20,
    }],
  };

  constructor() { }

  ngOnChanges(): void {
    this.setChartMergeOption();
  }

  setChartMergeOption(): void {

    const rows = {
      Support: {
        name: 'Support',
        color: '#0969d7',
      },
      Oppose: {
        name: 'Oppose',
        color: '#d5631d',
      },
    }

    this.mergeOption = {
      backgroundColor: this.backgroundColor,
      yAxis: {
        axisLabel: {
          color: this.textColor,
        },
        data: [rows.Support.name, rows.Oppose.name],
      },
      series: {
        label: {
          color: this.textColor,
        },
        data: [
          {
            name: rows.Support.name,
            value: this.support,
            itemStyle: { color: rows.Support.color, },
          },
          {
            name: rows.Oppose.name,
            value: this.oppose,
            itemStyle: { color: rows.Oppose.color, },
          },
        ],
      }
    }

  }

}
