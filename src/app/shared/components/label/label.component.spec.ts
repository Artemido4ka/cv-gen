import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelComponent } from './label.component';
import { TranslateModule } from '@ngx-translate/core';

describe('LabelComponent', () => {
  let component: LabelComponent;
  let fixture: ComponentFixture<LabelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [LabelComponent, TranslateModule.forRoot()],
    });

    fixture = TestBed.createComponent(LabelComponent);
    component = fixture.componentInstance;
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should take inputs', () => {
    const h1 = fixture.nativeElement.querySelector('label');
    component.label = 'test label';

    component.hasError = true;
    fixture.detectChanges();

    expect(h1.textContent).toContain('test label');
  });
});
