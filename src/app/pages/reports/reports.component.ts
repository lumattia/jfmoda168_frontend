import { Component } from '@angular/core';
import { LogService } from '../../services/log.service';
import { DatePickerModule } from 'primeng/datepicker';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TableModule } from 'primeng/table';
import { NgxEchartsModule } from 'ngx-echarts';

import { LogFilter, LogStat } from '../../interfaces/logs';
import { IdName } from '../../interfaces/idname';
import { CommonModule, formatDate } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../enviroments/enviroment';

@Component({
    selector: 'app-reports',
    imports: [DatePickerModule, SelectButtonModule, TableModule,NgxEchartsModule, CommonModule, FormsModule],
    templateUrl: './reports.component.html',
    styleUrl: './reports.component.css'
})
export class ReportsComponent {
  rawData: LogStat[] = [];
  groupedData: any[] = [];
  groupBy: 'product' | 'material' | 'color' = 'product';

  groupOption :IdName []= [
    { name: '产品', id: 'product' },
    { name: '布料', id: 'material' },
    { name: '颜色', id: 'color' }
  ];

  loading = false;
  filter: LogFilter = {};
  date: Date[] = [];
  chartOptions: any;


  constructor(private logService: LogService) {}

  ngOnInit() {
    let now = new Date();
    this.date=[new Date(now.getFullYear(),now.getMonth(), 1), now]
    this.fetchData();
  }
  fetchData() {
    this.loading = true;
    if (!this.date[1]) {
        this.rawData = [];
        return;
    }
    this.filter.dateFrom=formatDate(this.date[0], 'yyyy-MM-dd', 'en-US');
    this.filter.dateTo=formatDate(this.date[1], 'yyyy-MM-dd', 'en-US');
    this.logService.report(
        this.filter
    ).subscribe({
      next: (res) => {
        console.log(res)
        this.rawData = res;
        this.updateGroupedData();
        this.loading = false;
      },
      error: () => (this.loading = false)
    });
  }

   setGroupBy(value: 'product' | 'material' | 'color') {
    this.groupBy = value;
    this.updateGroupedData();
  }

  updateGroupedData() {
    const map = new Map<string, any>();

    this.rawData.forEach((item) => {
      let key = '';
      if (this.groupBy === 'product') {
        key = item.productName;
      } else if (this.groupBy === 'material') {
        key = item.productName + '_' + item.materialName;
      } else if (this.groupBy === 'color') {
        key = item.productName + '_' + item.materialName + '_' + item.colorName;
      }

      if (!map.has(key)) {
        map.set(key, {
          productName: item.productName,
          materialName: item.materialName,
          colorName: item.colorName,
          colorImg: item.imageUrl?environment.fileUrl+item.imageUrl : '', // 后端提供的颜色图
          amount: 0
        });
      }
      map.get(key).amount += item.amount;
    });

    this.groupedData = Array.from(map.values()).sort((a, b) => b.amount - a.amount);

    this.updateChart();
  }

  updateChart() {
    this.chartOptions = {
      tooltip: {},
      xAxis: { type: 'category', data: this.groupedData.map(d => 
        this.groupBy === 'product' ? d.productName :
        this.groupBy === 'material' ? d.materialName :
        d.colorName
      ) },
      yAxis: { type: 'value' },
      series: [{ type: 'bar', data: this.groupedData.map(d => d.amount) }]
    };
  }
}
