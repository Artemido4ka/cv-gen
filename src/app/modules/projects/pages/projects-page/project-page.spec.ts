import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectsPageComponent } from './projects-page.component';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { TranslateModule } from '@ngx-translate/core';
import { CustomTableComponent } from 'src/app/shared/components/tables/custom-table/custom-table.component';
import { ActivatedRoute, Router } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ProjectsPageComponent', () => {
  let component: ProjectsPageComponent;
  let fixture: ComponentFixture<ProjectsPageComponent>;
  let router: Router;
  let route: ActivatedRoute;
  // let store: MockStore;

  beforeEach(() => {
    const initialState = {};

    TestBed.configureTestingModule({
      providers: [provideMockStore({ initialState })],
      declarations: [ProjectsPageComponent],
      imports: [
        BrowserAnimationsModule,
        TranslateModule.forRoot(),
        RouterTestingModule,
        CustomTableComponent,
      ],
    });

    fixture = TestBed.createComponent(ProjectsPageComponent);
    component = fixture.componentInstance;

    router = TestBed.inject(Router);
    route = TestBed.inject(ActivatedRoute);
   // store = TestBed.inject(MockStore) as MockStore;
  });

  // it('should dispatch getProjectsAction on ngOnInit', () => {
  //   spyOn(store, 'dispatch');
  //   component.ngOnInit();
  // });

  it('should navigate to create project page', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.onSubmit();
    expect(navigateSpy).toHaveBeenCalledWith(['add'], { relativeTo: route });
  });
});
