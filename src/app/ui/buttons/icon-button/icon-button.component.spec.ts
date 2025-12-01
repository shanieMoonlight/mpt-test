import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MptUiIconButton } from './icon-button';

describe('MptUiIconButton', () => {
  let fixture: ComponentFixture<MptUiIconButton>;
  let component: MptUiIconButton;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MptUiIconButton],
    }).compileComponents();

    fixture = TestBed.createComponent(MptUiIconButton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders icon content and default attributes', () => {
    // default iconName is undefined -> content empty
    const btnDe = fixture.debugElement.query(By.css('button.mpt-icon-btn'));
    expect(btnDe).toBeTruthy();
    const iconEl = btnDe.query(By.css('mpt-ui-icon i'))?.nativeElement as HTMLElement | null;
    // when no icon provided, content may be empty but element exists
    expect(iconEl).toBeTruthy();
    const btn: HTMLButtonElement = btnDe.nativeElement;
    expect(btn.getAttribute('type')).toBe('button');
    expect(btn.disabled).toBe(false);
    expect(btn.classList.contains('primary')).toBeTruthy();
  });

  it('applies inputs via componentRef.setInput and renders icon name', () => {
    fixture.componentRef.setInput('iconName', 'check');
    fixture.componentRef.setInput('theme', 'secondary');
    fixture.componentRef.setInput('disabled', true);
    fixture.componentRef.setInput('type', 'submit');
    fixture.detectChanges();

    const btnDe = fixture.debugElement.query(By.css('button.mpt-icon-btn'));
    const btn: HTMLButtonElement = btnDe.nativeElement;
    expect(btn.getAttribute('type')).toBe('submit');
    expect(btn.disabled).toBe(true);
    expect(btn.classList.contains('secondary')).toBeTruthy();

    const iconText = btnDe.query(By.css('mpt-ui-icon i'))?.nativeElement.textContent?.trim();
    expect(iconText).toBe('check');
  });
});
