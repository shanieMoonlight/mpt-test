import { TestBed, ComponentFixture } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MptMenuSelectorButton } from './selector-button';
import { By } from '@angular/platform-browser';

describe('MptMenuSelectorButton', () => {
  let fixture: ComponentFixture<MptMenuSelectorButton>;
  let component: MptMenuSelectorButton;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MptMenuSelectorButton],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(MptMenuSelectorButton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('has correct default input values', () => {
    // inputs are implemented as signal-like functions via `input()` helper
    expect((component as any).theme()).toBe('primary');
    expect((component as any).nonthingSelectedText()).toBe('Select Question Type');
    expect((component as any).selected()).toBe(false);
  });

  it('accepts item and selected inputs', () => {
    const item = { type: 1, icon: 'check', label: 'Example' };
    component = fixture.componentInstance;
    // set inputs using the signal setter API
    // (component as any).item(item);
    fixture.componentRef.setInput('item', item);
    // (component as any).selected(true);
    fixture.componentRef.setInput('selected', true);
    fixture.detectChanges();

    expect((component as any).item()).toEqual(item);
    expect((component as any).selected()).toBe(true);

    // DOM assertions: icon text, label text, data-testid and selected class
    const btn = fixture.debugElement.query(By.css('button.selector-btn'));
    expect(btn).toBeTruthy();
    const icon = btn.query(By.css('.icon-left')).nativeElement as HTMLElement;
    const label = btn.query(By.css('.label')).nativeElement as HTMLElement;
    expect(icon.textContent?.trim()).toBe(item.icon);
    expect(label.textContent?.trim()).toBe(item.label);
    expect(btn.attributes['data-testid']).toBe(item.label);
    expect(btn.classes['selected']).toBeTruthy();
  });

  it('host element receives class matching `theme` input', () => {
    // default is 'primary' but set explicitly to ensure binding works
    fixture.componentRef.setInput('theme', 'primary');
    fixture.detectChanges();

    // host element classes are available on the fixture debugElement
    const classes = fixture.debugElement.classes;
    expect(classes['primary']).toBeTruthy();
  });
});
