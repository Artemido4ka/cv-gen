import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseControlDirective } from '../../directives/base-control.directive';
import {
  MatAutocompleteModule,
  MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { untilDestroyed } from '@ngneat/until-destroy';
import { map, startWith } from 'rxjs';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

import { MatIconModule } from '@angular/material/icon';
import { ErrorMessageComponent } from '../error-message/error-message.component';

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
  ],
  templateUrl: './autocomplete-select.component.html',
  styleUrls: ['./autocomplete-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutocompleteSelectComponent extends BaseControlDirective implements OnInit {
  @Input() options: string[];
  chips: string[] = [];
  filteredOptions: string[];
  separatorKeysCodes: number[] = [ENTER, COMMA];
  inputControl = new FormControl();

  override ngOnInit() {
    this.chips = this.control.value;

    this.initInputControlValueChanges();
    this.initControlValueChanges();
  }

  protected override initControlValueChanges(): void {
    this.control.valueChanges.pipe(untilDestroyed(this)).subscribe(value => {
      this.onChange(value);
      this.onTouch();
    });
  }

  initInputControlValueChanges(): void {
    this.inputControl.valueChanges
      .pipe(
        untilDestroyed(this),
        startWith(''),
        map(value => this.filter(value || ''))
      )
      .subscribe(value => {
        this.filteredOptions = value;
      });
  }

  private filter(value: string): string[] {
    const filterValue = this.normalizeValue(value);
    return this.options.filter(option => this.normalizeValue(option).includes(filterValue));
  }

  private normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }

  add(event: MatChipInputEvent) {
    const value = (event.value || '').trim();
    if (value) {
      this.chips.push(value);
    }
    this.control.setValue(this.chips);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.chips.push(event.option.value);
    this.inputControl.setValue(null);
    this.control.setValue(this.chips);
  }

  remove(chip: string): void {
    const index = this.chips.indexOf(chip);

    if (index >= 0) {
      this.chips.splice(index, 1);
      this.control.setValue(this.chips);
    }
  }
}
