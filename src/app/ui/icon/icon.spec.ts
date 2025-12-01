import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MptUiIcon } from './icon';

@Component({
  selector: 'mpt-host',
  template: `<mpt-ui-icon [theme]="theme" [iconSizePx]="size">test</mpt-ui-icon>`,
  standalone: true,
  imports: [MptUiIcon],
})
class TestHostComponent {
  theme: string | undefined = undefined;
  size = 24;
}

describe('MptUiIcon (standalone)', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
  });

  it('sets host class based on `theme` input', () => {
    const theme = 'primary'
    fixture.componentInstance.theme = theme;
    fixture.detectChanges();

    const hostEl = fixture.nativeElement.querySelector('mpt-ui-icon');
    expect(hostEl).toBeTruthy();
    expect(hostEl.className).toBe(theme);
  });

  it('sets CSS variable `--icon-size-px` from `iconSizePx` input', () => {
    fixture.componentInstance.size = 48;
    fixture.detectChanges();

    const hostEl: HTMLElement = fixture.nativeElement.querySelector('mpt-ui-icon');
    expect(hostEl).toBeTruthy();
    // style property is set on the host element as an inline style variable
    const value = hostEl.style.getPropertyValue('--icon-size-px');
    expect(value).toBe('48px');
  });

  it('renders the inner <i> element and projects content', () => {
    fixture.componentInstance.theme = 'some-theme';
    fixture.componentInstance.size = 20;
    fixture.detectChanges();

    const iconEl: HTMLElement | null = fixture.nativeElement.querySelector('mpt-ui-icon i.material-icons');
    expect(iconEl).toBeTruthy();
    expect(iconEl!.classList.contains('material-icons')).toBe(true);
    // content projection from host template (`test`) should appear inside the <i>
    expect(iconEl!.textContent!.trim()).toBe('test');
  });

  it('uses default values when inputs are not provided', () => {
    // create a fresh fixture with defaults (theme undefined, size default 24)
    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();

    const hostEl: HTMLElement = fixture.nativeElement.querySelector('mpt-ui-icon');
    expect(hostEl).toBeTruthy();
    // default theme is undefined so there should be no host class set
    expect(hostEl.className.trim()).toBe('');
    // default iconSizePx is 24 -> CSS var should be `24px`
    expect(hostEl.style.getPropertyValue('--icon-size-px')).toBe('24px');
  });
});
