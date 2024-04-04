import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterModule } from '@angular/router';

import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { ComponentType } from '@angular/cdk/portal';

type Column = {
  columnDef: string;
  header: string;
  cellComponent?: ComponentType<unknown>;
};

@Component({
  selector: 'cv-gen-custom-table',
  standalone: true,
  imports: [CommonModule, MatTableModule, RouterLink, RouterModule, MatPaginatorModule],
  templateUrl: './custom-table.component.html',
  styleUrls: ['./custom-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomTableComponent<T> implements OnInit, AfterViewInit {
  displayedColumns: string[] = [];
  constructor(private router: Router) {}

  @Input() tableData: MatTableDataSource<T>;
  @Input() columns: Column[];
  @Input() linkUrl: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.displayedColumns = this.columns.map(c => c.columnDef);
  }

  ngAfterViewInit() {
    if (this.tableData) {
      this.tableData.paginator = this.paginator;
    }
  }

  handleRowClick(id: number) {
    this.router.navigate([this.linkUrl, id]);
  }
}
