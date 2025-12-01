import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SuccessModal } from './success.modal';

describe('SuccessModal', () => {
  let fixture: ComponentFixture<SuccessModal>;
  let component: SuccessModal;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuccessModal],
    }).compileComponents();

    fixture = TestBed.createComponent(SuccessModal);
    component = fixture.componentInstance;
  });

  it('creates', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('shows the success modal when `successMsg` is set and renders content', () => {
    const msg = 'Operation completed';
    fixture.componentRef.setInput('successMsg', msg);
    fixture.detectChanges();

    const backdrop = fixture.debugElement.query(By.css('.success-modal-backdrop'));
    expect(backdrop).toBeTruthy();

    const paragraph = fixture.debugElement.query(By.css('.success-modal-body p'))?.nativeElement as HTMLElement;
    expect(paragraph).toBeTruthy();
    expect(paragraph.textContent?.trim()).toBe(msg);

    const titleEl = fixture.debugElement.query(By.css('.success-modal-header h3'))?.nativeElement as HTMLElement;
    expect(titleEl).toBeTruthy();
    expect(titleEl.textContent?.trim()).toBe('Success');
  });

  it('emits `dismissed` and hides modal when close icon is clicked', () => {
    const msg = 'Done';
    const dismissedSpy = jest.fn();
    component.dismissed.subscribe(dismissedSpy);

    fixture.componentRef.setInput('successMsg', msg);
    fixture.detectChanges();

    const closeBtn = fixture.debugElement.query(By.css('[aria-label="Close success modal"]'));
    expect(closeBtn).toBeTruthy();

    closeBtn.triggerEventHandler('click', new MouseEvent('click'));
    fixture.detectChanges();

    expect(dismissedSpy).toHaveBeenCalled();
    const after = fixture.debugElement.query(By.css('.success-modal-backdrop'));
    expect(after).toBeNull();
  });

  it('emits `dismissed` and hides modal when footer Dismiss button is clicked', () => {
    const msg = 'Done again';
    const dismissedSpy = jest.fn();
    component.dismissed.subscribe(dismissedSpy);

    fixture.componentRef.setInput('successMsg', msg);
    fixture.detectChanges();

    // find the text button by its element and dispatch click
    const footerButton = fixture.debugElement.query(By.css('.success-modal-footer mpt-ui-text-button'));
    expect(footerButton).toBeTruthy();

    footerButton.triggerEventHandler('click', new MouseEvent('click'));
    fixture.detectChanges();

    expect(dismissedSpy).toHaveBeenCalled();
    const after = fixture.debugElement.query(By.css('.success-modal-backdrop'));
    expect(after).toBeNull();
  });
});
