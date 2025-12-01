import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MptUiTextButton } from './text-button.component';

describe('MptUiTextButton', () => {
  let fixture: ComponentFixture<MptUiTextButton>;
  let component: MptUiTextButton;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MptUiTextButton],
    }).compileComponents();

    fixture = TestBed.createComponent(MptUiTextButton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders defaults: type=button, not disabled, theme class present', () => {
    const btnDe = fixture.debugElement.query(By.css('button.mpt-text-button'));
    expect(btnDe).toBeTruthy();
    const btn: HTMLButtonElement = btnDe.nativeElement;

    // default type
    expect(btn.getAttribute('type')).toBe('button');
    // default not disabled
    expect(btn.disabled).toBe(false);
    // default theme is 'primary' (applied via ngClass)
    expect(btn.classList.contains('primary')).toBeTruthy();
  });

  it('applies inputs when set via componentRef.setInput', () => {
    fixture.componentRef.setInput('theme', 'secondary');
    fixture.componentRef.setInput('disabled', true);
    fixture.componentRef.setInput('type', 'submit');
    fixture.detectChanges();

    const btn: HTMLButtonElement = fixture.debugElement.query(By.css('button.mpt-text-button')).nativeElement;
    expect(btn.getAttribute('type')).toBe('submit');
    expect(btn.disabled).toBe(true);
    expect(btn.classList.contains('secondary')).toBeTruthy();
  });
});
