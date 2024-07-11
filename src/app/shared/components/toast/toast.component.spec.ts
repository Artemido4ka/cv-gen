import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToastComponent } from './toast.component';
import { ToastService } from '../../services/toast-service/toast.service';

describe('ToastComponent', () => {
  let component: ToastComponent;
  let fixture: ComponentFixture<ToastComponent>;

  const errorsServiceSpy = jasmine.createSpyObj('ToastService', ['closeToast']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ToastComponent],
      providers: [{ provide: ToastService, useValue: errorsServiceSpy }],
    });
    fixture = TestBed.createComponent(ToastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close toast when closeToast method is called', () => {
    const toastId = 1;

    component.closeToast(toastId);

    expect(errorsServiceSpy.closeToast).toHaveBeenCalledWith(toastId);
  });
});
