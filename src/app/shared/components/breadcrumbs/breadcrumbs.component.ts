import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { BreadcrumbsService } from '../../services/breadcrumbs.service';

export interface IBreadCrumb {
  label: string;
  url: string;
}

@Component({
  selector: 'cv-gen-breadcrumbs',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbsComponent implements OnInit {
  public breadcrumbs: IBreadCrumb[];

  constructor(
    private breadcrumbService: BreadcrumbsService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.breadcrumbs = this.breadcrumbService.breadcrumbs;
    this.breadcrumbService.breadcrumbsUpdated.subscribe(() => {
      this.breadcrumbs = this.breadcrumbService.breadcrumbs;
      this.cdRef.detectChanges();
    });
  }
}
