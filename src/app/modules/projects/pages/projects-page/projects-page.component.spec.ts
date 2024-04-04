import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsPageComponent } from './projects-page.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CustomTableComponent } from 'src/app/shared/components/tables/custom-table/custom-table.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';

describe('ProjectsPageComponent', () => {
  let component: ProjectsPageComponent;
  let fixture: ComponentFixture<ProjectsPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectsPageComponent],
      imports: [
        HttpClientModule,
        CustomTableComponent,
        BrowserAnimationsModule,
        TranslateModule.forRoot(),
      ],
      providers: [HttpClient, { provide: ActivatedRoute, useValue: { params: of({ id: 123 }) } }],
    });
    fixture = TestBed.createComponent(ProjectsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
