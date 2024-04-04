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

type Cell<T> = {
  columnDef: string;
  header: string;
  key?: string;
  // cell: (element: T) => string;
};

@Component({
  selector: 'cv-gen-table',
  standalone: true,
  imports: [CommonModule, MatTableModule, RouterLink, RouterModule, MatPaginatorModule],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent<T> implements OnInit, AfterViewInit {
  displayedColumns: string[] = [];
  constructor(private router: Router) {}

  @Input() tableData: MatTableDataSource<T>;
  @Input() columns: Cell<T>[];
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

  log(row: any) {
    console.log(row);
  }
}
