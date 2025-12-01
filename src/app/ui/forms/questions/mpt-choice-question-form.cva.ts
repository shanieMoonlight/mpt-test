/* eslint-disable @typescript-eslint/no-empty-function */
import { ChangeDetectionStrategy, Component, forwardRef, inject, Input, output, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AbstractControl, ControlValueAccessor, FormArray, FormBuilder, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, ReactiveFormsModule, ValidationErrors, Validator, Validators } from '@angular/forms';
import { FirstErrorComponent, FirstErrorDirective } from '@spider-baby/utils-forms';
import { Question } from '../../../data/models';
import { QuestionType } from '../../../data/models/question-type';
import { MptUiIconButton } from '../../buttons/icon-button/icon-button';
import { MptUiTextButton } from '../../buttons/text-button/text-button.component';
import { MptQuestionTypeMenu } from '../../menu/menu';
import { QuestionTypeMenuItem } from '../../menu/menu-item';
import { MptSwitchComponent } from '../../switch/switch.component';

//##########################//

interface ChoiceQuestionForm {
  questionId: FormControl<number>;
  questionText: FormControl<string>;
  questionType: FormControl<QuestionType>;
  mandatoryInd: FormControl<boolean>;
  randomizeOptions: FormControl<boolean>;
  options: FormArray<FormControl<string>>;
  instructions: FormControl<string>;
  programmerNotes: FormControl<string>;
}

//##########################//

const CHOICE_QUESTION_MENU_ITEMS: QuestionTypeMenuItem[] = [
  { type: QuestionType.singleChoice, icon: 'check_circle', label: 'Single-Choice' },
  { type: QuestionType.multipleChoice, icon: 'check_box', label: 'Multiple-Choice' },
];

//##########################//


@Component({
  selector: 'mpt-choice-question-cva',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FirstErrorDirective,
    FirstErrorComponent,
    MptQuestionTypeMenu,
    MptUiIconButton,
    MptUiTextButton,
    MptSwitchComponent
  ],
  templateUrl: './mpt-choice-question-form.html',
  styleUrl: './mpt-choice-question-form.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MptChoiceQuestionFormCva),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => MptChoiceQuestionFormCva),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(focusin)': '_hasFocus.set(true)',
    '(focusout)': '_onFocusOut()',
    '[class.focused]': '_hasFocus()'
  },
})
export class MptChoiceQuestionFormCva implements ControlValueAccessor, Validator {

  private _fb = inject(FormBuilder);


  //- - - - - - - - - - - - -//


  protected _questionNumber = signal<number>(0);
  @Input()
  set questionNumber(value: number) {
    this._questionNumber.set(value);
    this._form.controls.questionId.setValue(value);
    this._form.updateValueAndValidity();
  }

  isValid = output<boolean>()

  //- - - - - - - - - - - - -//

  protected _form = this._fb.group<ChoiceQuestionForm>({
    questionId: this._fb.nonNullable.control<number>(0, [Validators.required]),
    questionText: this._fb.nonNullable.control<string>('', [Validators.required]),
    questionType: this._fb.nonNullable.control<QuestionType>(QuestionType.singleChoice, [Validators.required]),
    mandatoryInd: this._fb.nonNullable.control<boolean>(false, [Validators.required]),
    randomizeOptions: this._fb.nonNullable.control<boolean>(false, []),
    options: new FormArray<FormControl<string>>([], [Validators.required]),
    instructions: this._fb.nonNullable.control<string>('', []),
    programmerNotes: this._fb.nonNullable.control<string>('', []),
  });


  protected _questionTypeMenuItems = CHOICE_QUESTION_MENU_ITEMS;
  protected _hasFocus = signal(true);
  private _disabled = signal(false);

  //- - - - - - - - - - - - -//

  constructor() {

    this._form.statusChanges.subscribe(() => this._onValidatorChange());

    // propagate form values to registered ControlValueAccessor consumers
    this._form.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe((val) => {
        const question: Question = {
          questionId: val.questionId || this._questionNumber(),
          questionText: val.questionText,
          mandatoryInd: val.mandatoryInd,
          questionType: val.questionType,
          options: val.options || [],
          randomizeOptionsInd: val.randomizeOptions,
          programmerNotes: val.programmerNotes,
          instructions: val.instructions,
        };
        this._onChange(question);
      });

    this._form.statusChanges
      .pipe(takeUntilDestroyed())
      .subscribe((isValid) => {
        // console.log('Choice Question Form isValid:', isValid);
        this.isValid.emit(isValid === 'VALID');
        this._onValidatorChange()
      })

  }

  //- - - - - - - - - - - - -//


  protected _onFocusOut() {
    this._hasFocus.set(false);
    this._onTouched();
  }


  //- - - - - - - - - - - - -//

  private get answerOptions() {
    return this._form.controls.options as FormArray;
  }

  protected addAnswerOption() {
    const optionControl = new FormControl<string>('', Validators.required);
    this.answerOptions.push(optionControl);
  }

  protected deleteAnswerOption(answerOptionIndex: number) {
    this.answerOptions.removeAt(answerOptionIndex);
  }

  //- - - - - - - - - - - - -//

  submitForm() {
    if (!this._form.valid)
      return;

    console.log(this._form.value);
    const question: Question = { ...this._form.value };
    console.log(question);
  }

  // ======================
  // ControlValueAccessor implementation
  // ======================


  writeValue(value: Question | null): void {


    if (!value) {
      this._form.reset();
      this.answerOptions.clear();
      //make sure we don't lose questionId
      this._form.controls.questionId.setValue(this._questionNumber());
      this._form.updateValueAndValidity();
      return;
    }
    // patch scalar controls without emitting valueChanges
    this._form.patchValue({
      questionId: value.questionId,
      questionText: value.questionText ?? '',
      questionType: value.questionType ?? QuestionType.singleChoice,
      mandatoryInd: value.mandatoryInd ?? false,
      randomizeOptions: value.randomizeOptionsInd ?? false,
      instructions: value.instructions ?? '',
      programmerNotes: value.programmerNotes ?? '',
    }, { emitEvent: false });

    // set options
    this.answerOptions.clear();
    (value.options || []).forEach(opt =>
      this.answerOptions.push(new FormControl<string>(opt))
    );
  }


  // CVA callbacks
  private _onChange: (value: Question | null) => void = () => { };
  private _onTouched: () => void = () => { };


  registerOnChange(fn: (value: Question | null) => void): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this._onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this._disabled.set(!!isDisabled);
    if (isDisabled)
      this._form.disable({ emitEvent: false });
    else
      this._form.enable({ emitEvent: false });
  }

  // ======================
  // ControlValueAccessor Validation
  // ======================

  private _onValidatorChange: () => void = () => { };

  // Validator API
  validate(control: AbstractControl): ValidationErrors | null {
    return this._form.invalid ? { invalidQuestion: true } : null;
  }

  registerOnValidatorChange(fn: () => void): void {
    this._onValidatorChange = fn;
  }

}//Cls
