import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

/**
 * Query a single DebugElement by exact `data-testid`.
 */
export function byTestId<T>(fixture: ComponentFixture<T>, id: string): DebugElement | null {
  return fixture.debugElement.query(By.css(`[data-testid="${id}"]`));
}

/**
 * Query DebugElements by `data-testid` prefix. If `exact` is true, matches exact id instead.
 */
export function byTestIdAll<T>(fixture: ComponentFixture<T>, prefixOrExact: string, exact = false): DebugElement[] {
  const selector = exact ? `[data-testid="${prefixOrExact}"]` : `[data-testid^="${prefixOrExact}"]`;
  return fixture.debugElement.queryAll(By.css(selector));
}
