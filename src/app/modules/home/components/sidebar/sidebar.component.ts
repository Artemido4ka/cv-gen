import { animate, state, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RoutingPaths } from 'src/app/shared/constants/routing-paths';

@Component({
  selector: 'cv-gen-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,

  animations: [
    trigger('openClose', [
      state('false', style({ width: '160px' })),
      state('true', style({ width: '60px' })),
      transition('false <=> true', [animate(500)]),
    ]),
  ],
})
export class SidebarComponent {
  isSidebarOpened = true;
  employeesRoute = RoutingPaths.EMPLOYEES;
  projectsRoute = RoutingPaths.PROJECTS;
  handleOpenSideBar() {
    this.isSidebarOpened = !this.isSidebarOpened;
  }
}
