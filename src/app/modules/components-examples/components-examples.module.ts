import { SelectComponent } from '../../shared/components/controls/select/select.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentsExamplesRoutingModule } from './components-examples-routing.module';
import { ComponentExamplesComponent } from './component-examples/component-examples.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from 'src/app/shared/components/controls/input/input.component';
import { TextareaComponent } from 'src/app/shared/components/controls/textarea/textarea.component';
import { OldSelectComponent } from 'src/app/shared/components/old-select/old-select.component';
import { MatDividerModule } from '@angular/material/divider';
import { AutocompleteComponent } from 'src/app/shared/components/controls/autocomplete/autocomplete.component';
import { AutocompleteSelectComponent } from 'src/app/shared/components/controls/autocomplete-select/autocomplete-select.component';
import { TableComponent } from 'src/app/shared/components/tables/table/table.component';
import { DatepickerComponent } from 'src/app/shared/components/controls/datepicker/datepicker.component';

@NgModule({
  declarations: [ComponentExamplesComponent],
  imports: [
    CommonModule,
    ComponentsExamplesRoutingModule,
    ReactiveFormsModule,
    InputComponent,
    TextareaComponent,
    OldSelectComponent,
    SelectComponent,
    MatDividerModule,
    AutocompleteComponent,
    AutocompleteSelectComponent,
    TableComponent,
    DatepickerComponent,
  ],
})
export class ComponentsExamplesModule {}
