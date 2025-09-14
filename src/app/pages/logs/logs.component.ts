import { Component } from '@angular/core';
import { LogService } from '../../services/log.service';
import { Log, LogFilter } from '../../interfaces/logs';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../enviroments/enviroment';
import { Action } from 'rxjs/internal/scheduler/Action';
@Component({
  selector: 'app-logs',
  imports: [NgbPaginationModule, CommonModule, FormsModule],
  templateUrl: './logs.component.html',
  styleUrl: './logs.component.css'
})
export class LogsComponent {
  logs: Log[] = [];
  totalItems = 0;
  page = 1;
  size = 10;
  sortColumn = 'logDate';
  sortDirection: 'asc' | 'desc' = 'desc';

  filter: LogFilter = {};

  previewImage?: string;
  constructor(private logService: LogService) { }

  ngOnInit(): void {
    this.loadLogs();
  }

  loadLogs(): void {
    this.logService.page(this.filter, this.page, this.size, this.sortColumn, this.sortDirection)
      .subscribe(data => {
        this.logs = data.content.map((log: Log) => {
          log.imageUrl = log.imageUrl ? environment.fileUrl + log.imageUrl : '';
          log.action = this.translateAction(log.action)
          return log;
        });
        this.totalItems = data.totalElements;
      });
  }
  translateAction(action: string): string {
    switch (action) {
      case 'ADD':
        return '入库';
      case 'REMOVE':
        return '出库';
      default:
        return action;
    }
  }
  undoLog(logId: number): void {
    if (!confirm(`确定要撤销吗?`)) {
      return;
    }

    this.logService.undo(logId).subscribe({
      next: () => {
        this.loadLogs(); // 刷新表格
      },
      error: (err) => {
        alert(err);
      }
    });
  }
  pageChanged(): void {
    this.loadLogs();
  }

  onSort(column: string): void {
    if (this.sortColumn == column)
      if (this.sortDirection == "desc")
        this.sortColumn = "";
      else
        this.sortDirection = this.sortDirection == "asc" ? "desc" : "asc";
    else {
      this.sortColumn = column
      this.sortDirection = "asc";
    }
    this.loadLogs();
  }
  openImage(color: any) {
    this.previewImage = color;
  }

  closeImage() {
    this.previewImage = undefined;
  }
}
