import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Observable, debounceTime, map } from 'rxjs';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { BaseControlDirective } from '../../../directives/base-control.directive';
import { untilDestroyed } from '@ngneat/until-destroy';
import { ErrorMessageComponent } from '../../error-message/error-message.component';
import { LabelComponent } from '../../label/label.component';
import { TranslateModule } from '@ngx-translate/core';

const DELAY = 500;

@Component({
  selector: 'cv-gen-autocomplete',
  standalone: true,
  imports: [
    CommonModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    ErrorMessageComponent,
    LabelComponent,
    TranslateModule,
  ],
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutocompleteComponent extends BaseControlDirective<string> {
  filteredOptions$: Observable<string[]>;
  @Input() options$: Observable<string[]>;
  @Input() label: string;
  @Input() placeholder: string;
  @Input() id = 'autocompleteId';

  protected override initControlValueChanges(): void {
    this.filteredOptions$ = this.filterOptions('');

    this.control.valueChanges
      .pipe(
        untilDestroyed(this),
        map(value => ({ value, filteredOptions: this.filterOptions(value || '') })),
        debounceTime(DELAY)
      )
      .subscribe(
        ({ value, filteredOptions }: { value: string; filteredOptions: Observable<string[]> }) => {
          this.filteredOptions$ = filteredOptions;
          this.onChange(value);
           this.cdRef.markForCheck();
        }
      );
  }

  private filterOptions(value: string): Observable<string[]> {
    const filterValue = this.normalizeValue(value);

    return this.options$.pipe(
      map(item => item.filter(option => this.normalizeValue(option).includes(filterValue)))
    );
  }

  private normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }
}
