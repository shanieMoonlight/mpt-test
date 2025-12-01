import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MptUiDivider } from './divider';
import { hostHasThemeClass } from '../../../testing/theme-assert';

describe('MptUiDivider', () => {
  let fixture: ComponentFixture<MptUiDivider>;
  let component: MptUiDivider;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MptUiDivider],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(MptUiDivider);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('does not have theme class by default', () => {
    // default theme is undefined
    const classes = fixture.debugElement.classes;
    // ensure a common theme class is not 
    fixture.componentRef.setInput('theme', undefined);
    expect(classes['primary']).toBeFalsy();
    expect(classes['secondary']).toBeFalsy();
    expect(classes['tertiary']).toBeFalsy();
    expect(classes['error']).toBeFalsy();
    // expect(Object.keys(classes).length).toBe(0);
  });

  it('host element receives class matching `theme` input', () => {
    expect(hostHasThemeClass(fixture, 'primary')).toBeTruthy();
    expect(hostHasThemeClass(fixture, 'secondary')).toBeTruthy();
  });
});

describe('Divider', () => {
  let component: MptUiDivider;
  let fixture: ComponentFixture<MptUiDivider>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MptUiDivider]
    }).compileComponents();

    fixture = TestBed.createComponent(MptUiDivider);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
