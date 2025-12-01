import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ErrorModal } from './error.modal';

describe('ErrorModalComponent', () => {
  let component: ErrorModal;
  let fixture: ComponentFixture<ErrorModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErrorModal],
    }).compileComponents();

    fixture = TestBed.createComponent(ErrorModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders error message when `errorMsg` input is set', () => {
    const msg = 'Something went wrong';
    fixture.componentRef.setInput('errorMsg', msg);
    fixture.detectChanges();

    const backdrop = fixture.debugElement.nativeElement.querySelector('.error-modal-backdrop');
    expect(backdrop).toBeTruthy();

    const p = fixture.debugElement.nativeElement.querySelector('.error-modal-body p');
    expect(p).toBeTruthy();
    expect(p.textContent.trim()).toBe(msg);
  });

  it('dismissError clears message and emits dismissed', () => {
    const msg = 'Bad news';
    const dismissedSpy = jest.fn();
    component.dismissed.subscribe(dismissedSpy);

    // set message and show modal
    fixture.componentRef.setInput('errorMsg', msg);
    fixture.detectChanges();

    // call dismiss (simulates click handler)
    (component as any).dismissError();
    fixture.detectChanges();

    expect(dismissedSpy).toHaveBeenCalled();
    const backdropAfter = fixture.debugElement.nativeElement.querySelector('.error-modal-backdrop');
    expect(backdropAfter).toBeNull();
  });
});
