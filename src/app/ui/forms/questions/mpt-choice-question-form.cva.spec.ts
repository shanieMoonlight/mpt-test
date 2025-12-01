import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormControl, FormArray } from '@angular/forms';
import { MptChoiceQuestionFormCva } from './mpt-choice-question-form.cva';
import { QuestionType } from '../../../data/models/question-type';

describe('MptChoiceQuestionFormCva', () => {
  let fixture: ComponentFixture<MptChoiceQuestionFormCva>;
  let component: MptChoiceQuestionFormCva;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MptChoiceQuestionFormCva],
    }).compileComponents();

    fixture = TestBed.createComponent(MptChoiceQuestionFormCva);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('creates', () => {
    expect(component).toBeTruthy();
  });

  it('writeValue(null) resets form and preserves questionNumber', () => {
    // set a questionNumber first
    fixture.componentRef.setInput('questionNumber', 7);
    fixture.detectChanges();

    component.writeValue(null);

    const form = (component as any)._form;
    expect(form.controls.questionId.value).toBe(7);
    expect((form.controls.options as FormArray).length).toBe(0);
  });

  it('writeValue(value) populates scalar controls and options', () => {
    const value = {
      questionId: 2,
      questionText: 'What is your favorite?',
      mandatoryInd: true,
      questionType: QuestionType.multipleChoice,
      options: ['A', 'B', 'C'],
      randomizeOptionsInd: true,
      programmerNotes: 'note',
      instructions: 'instr',
    } as any;

    component.writeValue(value);
    fixture.detectChanges();

    const form = (component as any)._form;
    expect(form.controls.questionId.value).toBe(2);
    expect(form.controls.questionText.value).toBe('What is your favorite?');
    expect(form.controls.mandatoryInd.value).toBe(true);
    expect(form.controls.questionType.value).toBe(QuestionType.multipleChoice);
    expect((form.controls.options as FormArray).length).toBe(3);
    expect(form.controls.instructions.value).toBe('instr');
    expect(form.controls.programmerNotes.value).toBe('note');
  });

  it('clicking Add Option button calls addAnswerOption and increases options length', () => {
    const form = (component as any)._form;
    expect((form.controls.options as FormArray).length).toBe(0);

    const btn = fixture.debugElement.query(By.css('#btn-add-option'));
    expect(btn).toBeTruthy();

    btn.nativeElement.click();
    fixture.detectChanges();

    expect((form.controls.options as FormArray).length).toBe(1);
  });

  it('clicking a delete button removes the correct option', () => {
    const form = (component as any)._form;

    // seed three options with distinct values
    (form.controls.options as FormArray).push(new FormControl('A'));
    (form.controls.options as FormArray).push(new FormControl('B'));
    (form.controls.options as FormArray).push(new FormControl('C'));
    fixture.detectChanges();

    expect((form.controls.options as FormArray).length).toBe(3);

    const deletes = fixture.debugElement.queryAll(By.css('[data-testid^="btn-delete-option-"]'));
    expect(deletes.length).toBe(3);

    // click the middle delete button (index 1)
    deletes[1].nativeElement.click();
    fixture.detectChanges();

    const opts = form.controls.options as FormArray;
    expect(opts.length).toBe(2);
    expect(opts.at(0).value).toBe('A');
    expect(opts.at(1).value).toBe('C');
  });

  it('template contains formControlName="mandatoryInd"', () => {
    const el = fixture.debugElement.query(By.css('[formControlName="mandatoryInd"]'));
    expect(el).toBeTruthy();
    // ensure the element has the expected id as well
    const id = el.nativeElement.getAttribute('id') || el.nativeElement.id;
    expect(id).toBe('mandatoryInd');
  });

  it('template contains formControlName="randomizeOptions"', () => {
    const el = fixture.debugElement.query(By.css('[formControlName="randomizeOptions"]'));
    expect(el).toBeTruthy();
    const id = el.nativeElement.getAttribute('id') || el.nativeElement.id;
    expect(id).toBe('randomizeOptions');
  });

  it('template contains formControlName="questionText"', () => {
    const el = fixture.debugElement.query(By.css('[formControlName="questionText"]'));
    expect(el).toBeTruthy();
    const id = el.nativeElement.getAttribute('id') || el.nativeElement.id;
    expect(id).toBe('questionText');
  });

  it('each .option-row starts with a span containing "-"', () => {
    const form = (component as any)._form;
    // add two options so two rows render
    (form.controls.options as FormArray).push(new FormControl('A'));
    (form.controls.options as FormArray).push(new FormControl('B'));
    fixture.detectChanges();

    const rows = fixture.debugElement.queryAll(By.css('[data-testid^="option-row-"]'));
    expect(rows.length).toBe(2);

    rows.forEach(row => {
      const firstEl = row.nativeElement.firstElementChild as HTMLElement | null;
      expect(firstEl).toBeTruthy();
      expect(firstEl!.tagName).toBe('SPAN');
      expect(firstEl!.textContent?.trim()).toBe('-');
    });
  });

  
  it('template contains formControlName="questionText"', () => {
    const el = fixture.debugElement.query(By.css('[formControlName="questionType"]'));
    expect(el).toBeTruthy();
    const id = el.nativeElement.getAttribute('id') || el.nativeElement.id;
    expect(id).toBe('questionType');
  });


  it('registerOnChange receives form changes', () => {
    const spy = jest.fn();
    component.registerOnChange(spy);

    const form = (component as any)._form;
    // set a required option so the form can become valid when needed
    (form.controls.options as FormArray).push(new FormControl('opt'));

    form.controls.questionText.setValue('New question text');

    expect(spy).toHaveBeenCalled();
    const calledWith = spy.mock.calls[spy.mock.calls.length - 1][0];
    expect(calledWith.questionText).toBe('New question text');
  });

  it('setDisabledState disables and enables the form', () => {
    component.setDisabledState(true);
    const form = (component as any)._form;
    expect(form.disabled).toBe(true);

    component.setDisabledState(false);
    expect(form.disabled).toBe(false);
  });

  it('validate() reflects form validity and registerOnValidatorChange is called on status change', () => {
    const form = (component as any)._form;
    // initially invalid because no questionText and no options
    expect(component.validate(form)).toEqual({ invalidQuestion: true });

    const spy = jest.fn();
    component.registerOnValidatorChange(spy);

    // make form valid: set text and add an option
    form.controls.questionText.setValue('X');
    (form.controls.options as FormArray).push(new FormControl('opt'));

    // statusChanges should trigger the registered validator-change callback
    expect(spy).toHaveBeenCalled();
    // now validate should be null
    expect(component.validate(form)).toBeNull();
  });
});
