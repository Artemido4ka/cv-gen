import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentsExamplesRoutingModule } from './components-examples-routing.module';
import { ComponentExamplesComponent } from './component-examples/component-examples.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from 'src/app/shared/components/input/input.component';
import { TextareaComponent } from 'src/app/shared/components/textarea/textarea.component';
import { SelectComponent } from 'src/app/shared/components/select/select.component';

@NgModule({
  declarations: [ComponentExamplesComponent],
  imports: [
    CommonModule,
    ComponentsExamplesRoutingModule,
    ReactiveFormsModule,
    InputComponent,
    TextareaComponent,
    SelectComponent
  ],
})
export class ComponentsExamplesModule {}
