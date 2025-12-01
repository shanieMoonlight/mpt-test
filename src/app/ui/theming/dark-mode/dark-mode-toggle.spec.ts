import { NgTemplateOutlet } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BehaviorSubject } from 'rxjs';
import { MptDarkModeToggle } from './dark-mode-toggle';
import { SbThemeService } from '@spider-baby/material-theming/service';
import { signal } from '@angular/core';

// Remove jest.mock completely and instead create a mock class
class MockSbThemeService {
  isDarkMode$ = new BehaviorSubject<boolean>(false);
  isDarkMode = signal(false);
  setDarkMode = jest.fn((isDark: boolean) => {
    this.isDarkMode$.next(isDark);
    this.isDarkMode.set(isDark);
  });
}

describe('MptDarkModeToggle', () => {
  let component: MptDarkModeToggle;
  let fixture: ComponentFixture<MptDarkModeToggle>;
  let mockSbThemeService: MockSbThemeService;
  
  //-----------------------------//
  
  beforeEach(async () => {
    mockSbThemeService = new MockSbThemeService();

    await TestBed.configureTestingModule({
      imports: [
        NgTemplateOutlet,
        MatTooltipModule,
        MatSlideToggleModule,
        MptDarkModeToggle
      ],
      providers: [
        // This is the key line - provide the mock directly through DI
        { provide: SbThemeService, useValue: mockSbThemeService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MptDarkModeToggle);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Test cases as before
  it('should create the toggle component', () => {
    expect(component).toBeTruthy();
  });

  //- - - - - - - - - - - - - - -//

  it('should have hideSwitch input defaulting to true', () => {
    expect(component.hideSwitch()).toBe(true);
  });

  //- - - - - - - - - - - - - - -//

  it('should initialize with correct dark mode state', () => {
    expect((component as any)['isDark']()).toBe(false);
    
    mockSbThemeService.isDarkMode.set(true);
    fixture.detectChanges();
    
    expect((component as any)['isDark']()).toBe(true);
  });

  //- - - - - - - - - - - - - - -//

  it('should call themeService.setDarkMode when toggleDarkTheme is called', () => {
    component.toggleDarkTheme(true);
    expect(mockSbThemeService.setDarkMode).toHaveBeenCalledWith('dark');
  });
});