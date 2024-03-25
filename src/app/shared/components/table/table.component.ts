import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { Router, RouterLink, RouterModule } from '@angular/router';

type Cell<T> = {
  columnDef: string;
  header: string;
  cell: (element: T) => string;
};

@Component({
  selector: 'cv-gen-table',
  standalone: true,
  imports: [CommonModule, MatTableModule, RouterLink, RouterModule],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent<T> implements OnInit {
  displayedColumns: string[] = [];
  constructor(private router: Router) {}

  @Input() tableData: T[];
  @Input() columns: Cell<T>[];
  @Input() linkUrl: string;

  ngOnInit(): void {
    this.displayedColumns = this.columns.map(c => c.columnDef);
  }

  handleCellClick(id: number) {
    this.router.navigate([this.linkUrl, id]);
  }
}
