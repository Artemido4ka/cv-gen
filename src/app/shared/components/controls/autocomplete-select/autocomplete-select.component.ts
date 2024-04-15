import { ChangeDetectionStrategy, Component, DoCheck, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { untilDestroyed } from '@ngneat/until-destroy';
import { Observable, debounceTime, map, startWith } from 'rxjs';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import {
  MatAutocompleteModule,
  MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';

import { BaseControlDirective } from '../../../directives/base-control.directive';
import { ErrorMessageComponent } from '../../error-message/error-message.component';
import { LabelComponent } from '../../label/label.component';
import { TranslateModule } from '@ngx-translate/core';

const DELAY = 500;

@Component({
  selector: 'cv-gen-autocomplete-select',
  standalone: true,
  imports: [
    CommonModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatChipsModule,
    MatIconModule,
    ErrorMessageComponent,
    LabelComponent,
    TranslateModule,
  ],
  templateUrl: './autocomplete-select.component.html',
  styleUrls: ['./autocomplete-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutocompleteSelectComponent
  extends BaseControlDirective<string[]>
  implements OnInit, DoCheck
{
  @Input() label: string;
  @Input() placeholder: string;
  @Input() id = 'autocompleteSelectId';
  @Input() options$: Observable<string[]>;
  chips: string[] = [];
  filteredOptions$: Observable<string[]>;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  inputControl = new FormControl();

  override ngOnInit() {
    this.chips = [...this.control.value];

    this.initInputControlValueChanges();
    this.initControlValueChanges();
  }

  override writeValue(value: string[]): void {
    this.control.setValue(value);
    this.chips = [...this.control.value];
    this.cdRef.detectChanges();
  }

  initInputControlValueChanges(): void {
    this.inputControl.valueChanges
      .pipe(
        untilDestroyed(this),
        startWith(''),
        map(inputValue => this.filterOptions(inputValue || '')),
        debounceTime(DELAY)
      )
      .subscribe(filteredOptions => {
        this.filteredOptions$ = filteredOptions;
        this.cdRef.markForCheck();
      });
  }

  private filterOptions(value: string): Observable<string[]> {
    const filterValue = this.normalizeValue(value);

    //  return this.options.pipe(filter(option => this.normalizeValue(option).includes(filterValue)))

    return this.options$.pipe(
      map(item => item.filter(option => this.normalizeValue(option).includes(filterValue)))
    );
  }

  private normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }

  addChip(event: MatChipInputEvent) {
    const value = (event.value || '').trim();

    if (value) {
      this.chips.push(value);
    }
    this.control.setValue(this.chips);
  }

  selectChip(event: MatAutocompleteSelectedEvent): void {
    this.chips = [...this.chips, event.option.value];
    this.inputControl.setValue(null);
    this.control.setValue(this.chips);
  }

  removeChip(chip: string): void {
    const index = this.chips.indexOf(chip);

    if (index >= 0) {
      this.chips.splice(index, 1);
      this.control.setValue(this.chips);
    }
  }
}
