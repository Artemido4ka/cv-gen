import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { debounceTime, map, startWith } from 'rxjs';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { BaseControlDirective } from '../../../directives/base-control.directive';
import { untilDestroyed } from '@ngneat/until-destroy';
import { ErrorMessageComponent } from '../../error-message/error-message.component';

const DELAY = 500;

@Component({
  selector: 'cv-gen-autocomplete',
  standalone: true,
  imports: [CommonModule, MatAutocompleteModule, ReactiveFormsModule, ErrorMessageComponent],
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutocompleteComponent extends BaseControlDirective<string> {
  filteredOptions: string[];
  @Input() options: string[];

  protected override initControlValueChanges(): void {
    this.control.valueChanges
      .pipe(
        untilDestroyed(this),
        startWith(''),
        map(value => ({ value, filteredOptions: this.filter(value || '') }))
        // debounceTime(DELAY)
      )
      .subscribe(({ value, filteredOptions }: { value: string; filteredOptions: string[] }) => {
        this.filteredOptions = filteredOptions;
        this.onChange(value);
      });
  }

  private filter(value: string): string[] {
    const filterValue = this.normalizeValue(value);
    return this.options.filter(option => this.normalizeValue(option).includes(filterValue));
  }

  private normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }
}
