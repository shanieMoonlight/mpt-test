import { ChangeDetectionStrategy, Component, computed, inject, Input, output, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormArray, FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { FirstErrorComponent, FirstErrorDirective } from '@spider-baby/utils-forms';
import { Question, SurveyDto } from '../../../data/models';
import { MptUiButtonComponent } from '../../buttons/button/button.component';
import { MptUiIconButton } from '../../buttons/icon-button/icon-button';
import { MptUiTextButton } from '../../buttons/text-button/text-button.component';
import { MptUiIcon } from '../../icon/icon';
import { MptChoiceQuestionFormCva } from '../questions/mpt-choice-question-form.cva';

//##########################//

interface SurveyForm {
  id: FormControl<string | null>;
  title: FormControl<string>;
  description: FormControl<string>;
  questions: FormArray<FormControl<Question>>;
}

//##########################//
@Component({
  selector: 'mpt-survey-form',
  imports: [
    ReactiveFormsModule,
    FirstErrorDirective,
    FirstErrorComponent,
    MptUiButtonComponent,
    MptUiIconButton,
    MptUiTextButton,
    MptChoiceQuestionFormCva,
    MptUiIcon
  ],
  templateUrl: './survey-form.html',
  styleUrl: './survey-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    ngSkipHydration: 'true'
  },
})
export class SurveyFormComponent {

  private _fb = inject(FormBuilder);

  //- - - - - - - - - - - - -//


  protected _surveyToEdit = signal<SurveyDto | undefined>(undefined);
  @Input()
  set surveyToEdit(survey: SurveyDto | null | undefined) {
    this._surveyToEdit.set(survey ?? undefined);
    if (!survey)
      return;
    this.setFormValues(survey);
  }


  newSurvey = output<SurveyDto>();
  updateSurvey = output<SurveyDto>();
  surveyDraft = output<SurveyDto>();


  //- - - - - - - - - - - - -//



  protected _form = this._fb.group<SurveyForm>({
    id: this._fb.nonNullable.control<string>('', []),
    title: this._fb.nonNullable.control<string>('', [Validators.required]),
    description: this._fb.nonNullable.control<string>('', [Validators.required]),
    questions: new FormArray<FormControl<Question>>([], [Validators.required]),
  });


  protected _isEditMode = computed(() => !!this._surveyToEdit());

  //- - - - - - - - - - - - -//

  constructor() {
    // Emit a draft everytime the questions control changes and is valid
    // Add a question : questions control becomes invalid (required) -> no draft emitted
    // Fill question : questions control becomes valid -> draft emitted
    this._form.controls.questions.statusChanges
      .pipe(takeUntilDestroyed())
      .subscribe((val) => {
        if (val === 'VALID') {
          //Ensure form is up to date (Has latest question values)
          //There seems to be a delay when deleting a question
          this._form.updateValueAndValidity(); 
          const survey: SurveyDto = this.toSurveyDto();
          console.log('survey draft emitted:', survey);
          this.surveyDraft.emit(survey)
        }
      })
  }

  //- - - - - - - - - - - - -//

  private get questions() {
    return this._form.controls.questions as FormArray;
  }

  protected addQuestion() {
    const questionControl = new FormControl<string>('', Validators.required);
    this.questions.push(questionControl);
  }

  protected deleteQuestion(QuestionIndex: number) {
    this.questions.removeAt(QuestionIndex);
  }


  //- - - - - - - - - - - - -//

  protected setFormValues(survey: SurveyDto) {

    this._form.patchValue({
      title: survey?.title ?? '',
      description: survey?.description ?? ''
    });

    //Questions id's sorted ascending. Undefined id's go to the end (Just in case...).
    const questions = (survey.questions ?? []).slice()
      .sort((q1, q2) => (q1.questionId ?? Number.POSITIVE_INFINITY) - (q2.questionId ?? Number.POSITIVE_INFINITY));


    for (let i = 0; i < questions.length; i++) {
      const question = questions[i];
      if (!question.questionId) { //A questionId is required, assign one if missing.  Just in case
        console.warn('SurveyFormComponent: question without questionId found in survey:', survey);
        console.warn('SurveyFormComponent: assigningId:', i + 1);
        question.questionId = i + 1; //Assign a questionId if missing
      }
      this.questions.push(new FormControl<Question>(question, Validators.required));
    }
    this._form.updateValueAndValidity();
  }


  //- - - - - - - - - - - - -//


  protected submitForm() {
    if (!this._form.valid)
      return;

    const survey: SurveyDto = this.toSurveyDto();
    console.log(survey);
    this.newSurvey.emit(survey);
  }


  protected update() {
    if (!this._form.valid)
      return;

    const survey: SurveyDto = this.toSurveyDto();
    console.log(survey);
    this.updateSurvey.emit(survey);
  }


  private toSurveyDto(): SurveyDto {
    const survey: SurveyDto = {
      ...this._form.value,
      id: this._surveyToEdit()?.id ?? ''
    };
    return survey;
  }


}//Cls
