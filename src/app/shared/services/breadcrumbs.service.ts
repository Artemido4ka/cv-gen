import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subject, distinctUntilChanged, filter } from 'rxjs';

export interface IBreadCrumb {
  label: string;
  url: string;
}

@Injectable({
  providedIn: 'root',
})
export class BreadcrumbsService {
  public breadcrumbs: IBreadCrumb[];
  public breadcrumbsUpdated: Subject<void> = new Subject<void>();

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        distinctUntilChanged()
      )
      .subscribe(() => {
        this.breadcrumbs = this.buildBreadCrumb(this.activatedRoute.root);
        this.breadcrumbsUpdated.next();
      });
  }

  addBreadCrumb(label: string) {
    const breadcrumb: IBreadCrumb = {
      label,
      url: this.router.url,
    };

    const lastBreadcrumb = this.breadcrumbs.at(-1);

    if (lastBreadcrumb.url.includes('edit')) {
      this.breadcrumbs.pop();
    }
    this.breadcrumbs.push(breadcrumb);
    this.breadcrumbsUpdated.next();
  }

  buildBreadCrumb(route: ActivatedRoute, url = '', breadcrumbs: IBreadCrumb[] = []): IBreadCrumb[] {
    const label =
      route.routeConfig && route.routeConfig.data ? route.routeConfig.data['breadcrumb'] : '';
    const path = route.routeConfig && route.routeConfig.data ? route.routeConfig.path : '';

    const nextUrl = path ? `${url}/${path}` : url;

    const breadcrumb: IBreadCrumb = {
      label: label,
      url: nextUrl,
    };

    const newBreadcrumbs = breadcrumb.label ? [...breadcrumbs, breadcrumb] : [...breadcrumbs];

    if (route.firstChild) {
      return this.buildBreadCrumb(route.firstChild, nextUrl, newBreadcrumbs);
    }

    return newBreadcrumbs;
  }
}
