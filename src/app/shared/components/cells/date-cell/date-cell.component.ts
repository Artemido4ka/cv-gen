import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'cv-gen-date-cell',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './date-cell.component.html',
  styleUrls: ['./date-cell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateCellComponent {
  @Input() cellValues: string;
}
