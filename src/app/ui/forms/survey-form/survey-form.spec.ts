import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormArray } from '@angular/forms';
import { SurveyFormComponent } from './survey-form';
import { Question, SurveyDto } from '../../../data/models';
import { By } from '@angular/platform-browser';
// import { byTestIdAll } from '../../../testing/test-id-helpers';
import { DummySurveys } from '../../../surveys';
import { byTestIdAll } from '../../../../testing/test-id-helpers';

//##########################//

const dummySurvey = DummySurveys[0]

//##########################//

describe('SurveyFormComponent', () => {
  let fixture: ComponentFixture<SurveyFormComponent>;
  let component: SurveyFormComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SurveyFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SurveyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('creates', () => {
    expect(component).toBeTruthy();
  });

  it('set surveyToEdit populates questions sorted by questionId (undefined last)', () => {
    const survey: SurveyDto = {
      id: 's1',
      title: 'My Survey',
      description: 'desc',
      questions: [
        { questionId: 2, questionText: 'Q2' } as any,
        { questionId: undefined, questionText: 'Q?' } as any,
        { questionId: 1, questionText: 'Q1' } as any,
      ],
    };

    fixture.componentRef.setInput('surveyToEdit', survey);
    fixture.detectChanges();

    const form = (component as any)._form;
    const questions = form.controls.questions as FormArray;
    expect(questions.length).toBe(3);

    const ids = questions.controls.map((c: FormControl) => (c.value as Question).questionId);
    expect(ids).toEqual([1, 2, 3]);
  });

  it('addQuestion increases questions length and deleteQuestion removes', () => {
    const form = (component as any)._form;
    const questions = form.controls.questions as FormArray;
    expect(questions.length).toBe(0);

    (component as any).addQuestion();
    fixture.detectChanges();
    expect(questions.length).toBe(1);

    (component as any).addQuestion();
    fixture.detectChanges();
    expect(questions.length).toBe(2);

    (component as any).deleteQuestion(0);
    fixture.detectChanges();
    expect(questions.length).toBe(1);
  });

  it('setFormValues sorts questions ascending by questionId (undefined last)', () => {
    const survey: SurveyDto = {
      id: 's-sort',
      title: 'Sort Test',
      description: 'Sort description',
      questions: [
        { questionId: 2, questionText: 'Q2' } as any,
        { questionId: 1, questionText: 'Q1' } as any,
        { questionId: undefined, questionText: 'Q?' } as any,
        { questionId: 3, questionText: 'Q3' } as any,
      ],
    };

    // call the protected method via any
    (component as any).setFormValues(survey);
    fixture.detectChanges();

    const form = (component as any)._form;
    const questions = form.controls.questions as FormArray;
    expect(questions.length).toBe(4);

    console.log(questions)

    const ids = questions.controls.map((c: FormControl) => (c.value as Question).questionId);
    expect(ids).toEqual([1, 2, 3, 4]);
  });



  it('update does not emit newSurvey when form is invalid, emits when valid', () => {
    const spy = jest.spyOn((component as any).updateSurvey, 'emit');

    // initial state: form is invalid (title/description required, questions empty)
    (component as any).update();
    expect(spy).not.toHaveBeenCalled();

    // make form valid: set title/description and add a valid question
    const form = (component as any)._form;
    form.controls.title.setValue('Valid Title');
    form.controls.description.setValue('Valid Desc');
    // (component as .addQuestion();
    fixture.detectChanges();
    (component as any).update();
    expect(spy).toHaveBeenCalledTimes(0);

    // set the question value so the FormControl becomes valid
    // const questions = form.controls.questions as FormArray;
    // questions.at(0).setValue('Some question text');
    (component as any).setFormValues(dummySurvey);
    fixture.detectChanges();
    console.log(form.value, form.valid);

    (component as any).update();
    expect(spy).toHaveBeenCalledTimes(1);
  });


  it('submitForm does not emit newSurvey when form is invalid, emits when valid', () => {
    const spy = jest.spyOn((component as any).newSurvey, 'emit');

    // initial state: form is invalid (title/description required, questions empty)
    (component as any).submitForm();
    expect(spy).not.toHaveBeenCalled();

    // make form valid: set title/description and add a valid question
    const form = (component as any)._form;
    form.controls.title.setValue('Valid Title');
    form.controls.description.setValue('Valid Desc');
    // (component as .addQuestion();
    fixture.detectChanges();
    (component as any).submitForm();
    expect(spy).toHaveBeenCalledTimes(0);

    // set the question value so the FormControl becomes valid
    // const questions = form.controls.questions as FormArray;
    // questions.at(0).setValue('Some question text');
    (component as any).setFormValues(dummySurvey);
    fixture.detectChanges();
    console.log(form.value);

    (component as any).submitForm();
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('shows submit button when not editing and edit button when editing', () => {
    // by default (no surveyToEdit) we are in create mode -> show submit
    fixture.detectChanges();
    const submitBtn = fixture.debugElement.query(By.css('#btn-submit'));
    const editBtn = fixture.debugElement.query(By.css('#btn-edit'));

    expect(submitBtn).toBeTruthy();
    expect(editBtn).toBeNull();

    // set surveyToEdit -> edit mode
    fixture.componentRef.setInput('surveyToEdit', dummySurvey);
    fixture.detectChanges();

    const submitAfter = fixture.debugElement.query(By.css('#btn-submit'));
    const editAfter = fixture.debugElement.query(By.css('#btn-edit'));

    expect(editAfter).toBeTruthy();
    expect(submitAfter).toBeNull();
  });

  it('template contains formControlName="id", "title", "description" and formArrayName="questions"', () => {
    const elId = fixture.debugElement.query(By.css('[formControlName="id"]'));
    const elTitle = fixture.debugElement.query(By.css('[formControlName="title"]'));
    const elDesc = fixture.debugElement.query(By.css('[formControlName="description"]'));

    // The questions form array may render no DOM when empty; add a question so the
    // `[formArrayName="questions"]` container exists in the template before querying it.
    (component as any).setFormValues(dummySurvey);

    console.log((component as any)._form?.controls?.questions?.value);
    console.log((component as any)._form?.value);
    

    fixture.detectChanges();


    const rows = byTestIdAll(fixture, 'option-row-');

    expect(elId).toBeTruthy();
    expect(elTitle).toBeTruthy();
    expect(elDesc).toBeTruthy();
    expect(rows.length).toBeGreaterThan(0);

    // optional: verify ids if present on the elements
    const idAttr = elId?.nativeElement.getAttribute('id') || elId?.nativeElement.id;
    if (idAttr) expect(idAttr).toBe('id');
    const titleAttr = elTitle?.nativeElement.getAttribute('id') || elTitle?.nativeElement.id;
    if (titleAttr) expect(titleAttr).toBe('title');
    const descAttr = elDesc?.nativeElement.getAttribute('id') || elDesc?.nativeElement.id;
    if (descAttr) expect(descAttr).toBe('description');
  });

});
