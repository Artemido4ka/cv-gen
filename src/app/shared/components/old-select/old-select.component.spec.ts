import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OldSelectComponent } from './old-select.component';

describe('SelectComponent', () => {
  let component: OldSelectComponent;
  let fixture: ComponentFixture<OldSelectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [OldSelectComponent],
    });
    fixture = TestBed.createComponent(OldSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
