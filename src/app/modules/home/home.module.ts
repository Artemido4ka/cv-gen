import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomePageComponent } from './page/home-page/home-page.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import {MatSidenavModule} from '@angular/material/sidenav';

@NgModule({
  declarations: [HomePageComponent, HeaderComponent, SidebarComponent],
  imports: [CommonModule, HomeRoutingModule, MatSidenavModule],
})
export class HomeModule {}
