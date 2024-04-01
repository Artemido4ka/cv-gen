import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsPageComponent } from './projects-page.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';

describe('ProjectsPageComponent', () => {
  let component: ProjectsPageComponent;
  let fixture: ComponentFixture<ProjectsPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectsPageComponent],
      imports: [HttpClientModule],
      providers: [HttpClient],
    });
    fixture = TestBed.createComponent(ProjectsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
