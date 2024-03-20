import { NewselectComponent } from './../../shared/components/newselect/newselect.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentsExamplesRoutingModule } from './components-examples-routing.module';
import { ComponentExamplesComponent } from './component-examples/component-examples.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from 'src/app/shared/components/input/input.component';
import { TextareaComponent } from 'src/app/shared/components/textarea/textarea.component';
import { SelectComponent } from 'src/app/shared/components/select/select.component';
import {MatDividerModule} from '@angular/material/divider'

@NgModule({
  declarations: [ComponentExamplesComponent],
  imports: [
    CommonModule,
    ComponentsExamplesRoutingModule,
    ReactiveFormsModule,
    InputComponent,
    TextareaComponent,
    SelectComponent,
    NewselectComponent,
    MatDividerModule
  ],
})
export class ComponentsExamplesModule {}
