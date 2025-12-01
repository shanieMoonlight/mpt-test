import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MptChoiceQuestionFormCva } from './mpt-choice-question-form.cva';

describe('ChoiceQuestionForm', () => {
  let component: MptChoiceQuestionFormCva;
  let fixture: ComponentFixture<MptChoiceQuestionFormCva>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MptChoiceQuestionFormCva]
    }).compileComponents();

    fixture = TestBed.createComponent(MptChoiceQuestionFormCva);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
