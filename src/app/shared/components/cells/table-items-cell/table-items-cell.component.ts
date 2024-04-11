import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'cv-gen-table-items-cell',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table-items-cell.component.html',
  styleUrls: ['./table-items-cell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableItemsCellComponent {
  @Input() cellValues: string[];
}
