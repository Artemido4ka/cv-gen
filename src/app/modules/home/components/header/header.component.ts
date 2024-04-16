import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RoutingPaths } from 'src/app/shared/constants/routing-paths';

@Component({
  selector: 'cv-gen-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  homeRoute = RoutingPaths.HOME;

}
