import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { RoutingPaths } from 'src/app/shared/constants/routing-paths';

@Component({
  selector: 'cv-gen-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  constructor(private translate: TranslateService) {}

  homeRoute = RoutingPaths.HOME;

  handleTranslate() {
    const currentLang = this.translate.currentLang;
    this.translate.use(currentLang === 'en' ? 'ru' : 'en');
  }
}
