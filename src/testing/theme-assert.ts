import { ComponentFixture } from '@angular/core/testing';

/**
 * Asserts that the host element for the fixture receives a class matching the
 * provided `theme` input. Use `fixture.componentRef.setInput('theme', value)` to
 * set the theme and trigger change detection inside the helper.
 */
export function hostHasThemeClass<T>(fixture: ComponentFixture<T>, theme: string): boolean {
  fixture.componentRef.setInput('theme', theme);
  fixture.detectChanges();
  const classes = fixture.debugElement.classes;
  return !!classes[theme];
}
