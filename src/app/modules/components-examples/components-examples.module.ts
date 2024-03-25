import { SelectComponent } from '../../shared/components/select/select.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentsExamplesRoutingModule } from './components-examples-routing.module';
import { ComponentExamplesComponent } from './component-examples/component-examples.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from 'src/app/shared/components/input/input.component';
import { TextareaComponent } from 'src/app/shared/components/textarea/textarea.component';
import { OldSelectComponent } from 'src/app/shared/components/old-select/old-select.component';
import { MatDividerModule } from '@angular/material/divider';
import { AutocompleteComponent } from 'src/app/shared/components/autocomplete/autocomplete.component';
import { AutocompleteSelectComponent } from 'src/app/shared/components/autocomplete-select/autocomplete-select.component';
import { TableComponent } from 'src/app/shared/components/table/table.component';

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
    TableComponent
  ],
})
export class ComponentsExamplesModule {}
