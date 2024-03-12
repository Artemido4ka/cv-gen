import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './page/home-routing.module';
import { HomeComponent } from './components/home.component';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, HomeRoutingModule],
})
export class HomeModule {}
