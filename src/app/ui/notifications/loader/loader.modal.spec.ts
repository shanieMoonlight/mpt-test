import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { LoaderModal } from './loader.modal';
import { hostHasThemeClass } from '../../../../testing/theme-assert';

describe('LoaderModal', () => {
  let fixture: ComponentFixture<LoaderModal>;
  let component: LoaderModal;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoaderModal],
    }).compileComponents();

    fixture = TestBed.createComponent(LoaderModal);
    component = fixture.componentInstance;
  });

  it('creates', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('is hidden by default (isLoading false)', () => {
    fixture.detectChanges();
    const backdrop = fixture.debugElement.query(By.css('.loader-modal-backdrop'));
    expect(backdrop).toBeNull();
  });

  it('shows loader when isLoading is true', () => {
    fixture.componentRef.setInput('isLoading', true);
    fixture.detectChanges();

    const backdrop = fixture.debugElement.query(By.css('.loader-modal-backdrop'));
    expect(backdrop).toBeTruthy();

    const card = fixture.debugElement.query(By.css('.loader-card'))?.nativeElement as HTMLElement;
    expect(card).toBeTruthy();
    expect(card.getAttribute('role')).toBe('status');
    expect(card.getAttribute('aria-label')).toBe('Loading');

    const spinner = fixture.debugElement.query(By.css('.spinner'));
    expect(spinner).toBeTruthy();

    // no message by default
    const msg = fixture.debugElement.query(By.css('.loader-message'));
    expect(msg).toBeNull();
  });

  it('renders loadingMessage when provided', () => {
    fixture.componentRef.setInput('isLoading', true);
    fixture.componentRef.setInput('loadingMessage', 'Please wait...');
    fixture.detectChanges();

    const msg = fixture.debugElement.query(By.css('.loader-message'))?.nativeElement as HTMLElement;
    expect(msg).toBeTruthy();
    expect(msg.textContent?.trim()).toBe('Please wait...');
  });

  it('applies theme class on host element', () => {
    // ensure modal is shown so host exists in DOM
    fixture.componentRef.setInput('isLoading', true);
    fixture.detectChanges();

    expect(hostHasThemeClass(fixture, 'primary')).toBeTruthy();
  });
});
