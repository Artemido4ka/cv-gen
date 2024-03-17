import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComponentExamplesComponent } from './component-examples/component-examples.component';

const routes: Routes = [
  {
    path: '',
    component: ComponentExamplesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentsExamplesRoutingModule { }
