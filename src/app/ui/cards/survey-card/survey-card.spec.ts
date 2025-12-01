import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { MptUiSurveyCard } from './survey-card';

describe('MptUiSurveyCard', () => {
  let fixture: ComponentFixture<MptUiSurveyCard>;
  let component: MptUiSurveyCard;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MptUiSurveyCard, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(MptUiSurveyCard);
    component = fixture.componentInstance;
  });

  it('renders survey details and computed route', () => {
    const survey = {
      id: '42',
      title: 'Test Survey',
      description: 'A sample description',
      questions: [{ questionId: 1 }, { questionId: 2 }],
    };

    // set inputs like Angular would
    fixture.componentRef.setInput('survey', survey);
    fixture.componentRef.setInput('theme', 'primary');
    fixture.detectChanges();

    const anchor = fixture.debugElement.query(By.css('a.survey-card'));
    expect(anchor).toBeTruthy();

    const el: HTMLElement = anchor.nativeElement;
    expect(el.getAttribute('data-testid')).toBe('route-card-42');
    expect(el.getAttribute('aria-label')).toBe('View Test Survey');

    const title = anchor.query(By.css('.card-title')).nativeElement as HTMLElement;
    const desc = anchor.query(By.css('.card-desc')).nativeElement as HTMLElement;
    const qcount = anchor.query(By.css('.question-count')).nativeElement as HTMLElement;

    expect(title.textContent?.trim()).toBe('Test Survey');
    expect(desc.textContent?.trim()).toBe('A sample description');
    expect(qcount.textContent?.trim()).toBe('2 Questions');

    // computed route should include the survey id
    const route = (component as any).surveyDetailRoute();
    expect(route).toContain('/');
    expect(route).toContain('42');
  });

  
  it('does not have theme class by default', () => {
        const survey = {
      id: '42',
      title: 'Test Survey',
      description: 'A sample description',
      questions: [{ questionId: 1 }, { questionId: 2 }],
    };

    // set inputs like Angular would
    fixture.componentRef.setInput('survey', survey);
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
        const survey = {
      id: '42',
      title: 'Test Survey',
      description: 'A sample description',
      questions: [{ questionId: 1 }, { questionId: 2 }],
    };

    // set inputs like Angular would
    fixture.componentRef.setInput('survey', survey);
    fixture.componentRef.setInput('theme', 'primary');
    fixture.detectChanges();
    const classes = fixture.debugElement.classes;
    expect(classes['primary']).toBeTruthy();

    // switching theme updates classes
    fixture.componentRef.setInput('theme', 'secondary');
    fixture.detectChanges();
    const updated = fixture.debugElement.classes;
    expect(updated['secondary']).toBeTruthy();
    expect(updated['primary']).toBeFalsy();
  });

});
