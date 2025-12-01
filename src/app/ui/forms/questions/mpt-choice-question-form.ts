// import { CommonModule } from '@angular/common';
// import { ChangeDetectionStrategy, Component, inject, output, signal } from '@angular/core';
// import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
// import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
// import { FirstErrorComponent, FirstErrorDirective } from '@spider-baby/utils-forms';
// import { QuestionType } from '../../data/models/question-type';
// import { MptButtonComponent } from '../buttons/button/button.component';
// import { MptIconButton } from '../buttons/icon-button/icon-button';
// import { MptTextButtonComponent } from '../buttons/text-button/text-button.component';
// import { MptQuestionTypeMenu } from '../menu/menu';
// import { QuestionTypeMenuItem } from '../menu/menu-item';
// import { Question } from '../../data/models';

// //##########################//

// interface ChoiceQuestionForm {
//   questionText: FormControl<string>;
//   questionType: FormControl<QuestionType>;
//   mandatoryInd: FormControl<boolean>;
//   randomizeOptions: FormControl<boolean>;
//   options: FormArray<FormControl<string>>;
//   instructions: FormControl<string>;
//   programmerNotes: FormControl<string>;
// }

// //##########################//

// const CHOICE_QUESTION_MENU_ITEMS: QuestionTypeMenuItem[] = [
//   { type: QuestionType.singleChoice, icon: 'check_circle', label: 'Single-Choice' },
//   { type: QuestionType.multipleChoice, icon: 'check_box', label: 'Multiple-Choice' },
// ];

// //##########################//


// @Component({
//   selector: 'mpt-choice-question-form',
//   imports: [
//     ReactiveFormsModule,
//     FirstErrorDirective,
//     FirstErrorComponent,
//     MptQuestionTypeMenu,
//     MptButtonComponent,
//     MptIconButton,
//     MptTextButtonComponent
//   ],
//   templateUrl: './mpt-choice-question-form.html',
//   styleUrl: './mpt-choice-question-form.scss',
//   changeDetection: ChangeDetectionStrategy.OnPush,
//   host: {
//     '(focusin)': '_hasFocus.set(true)',
//     '(focusout)': '_hasFocus.set(false)',
//     '[class.focused]': '_hasFocus()',
//   },
// })
// export class MptChoiceQuestionFormComponent {

//   private _fb = inject(FormBuilder);

//   isValid = output<boolean>()

//   //- - - - - - - - - - - - -//

//   protected _form = this._fb.group<ChoiceQuestionForm>({
//     questionText: this._fb.nonNullable.control<string>('', [Validators.required]),
//     questionType: this._fb.nonNullable.control<QuestionType>(QuestionType.singleChoice, [Validators.required]),
//     mandatoryInd: this._fb.nonNullable.control<boolean>(false, [Validators.required]),
//     randomizeOptions: this._fb.nonNullable.control<boolean>(false, []),
//     options: new FormArray<FormControl<string>>([], [Validators.required]),
//     instructions: this._fb.nonNullable.control<string>('', []),
//     programmerNotes: this._fb.nonNullable.control<string>('', []),
//   });


//   protected _questionTypeMenuItems = CHOICE_QUESTION_MENU_ITEMS;
//   protected _hasFocus = signal(true);

//   //- - - - - - - - - - - - -//

//   constructor() {

//     // this._form.valueChanges
//     //   .pipe(takeUntilDestroyed())
//     //   .subscribe((val) => {
//     //     console.log('Choice Question Form Value:', val);
//     //   })
//     //   this._form.controls.options.valueChanges
//     //     .pipe(takeUntilDestroyed())
//     //     .subscribe((val) => {
//     //       console.log('options Value:', val);
//     //     })

//     this._form.statusChanges
//       .pipe(takeUntilDestroyed())
//       .subscribe((isValid) => {
//         console.log('Choice Question Form isValid:', isValid);
//         this.isValid.emit(isValid === 'VALID');
//       })

//   }


//   private get answerOptions() {
//     return this._form.controls.options as FormArray;
//   }

//   protected addAnswerOption() {
//     const optionControl = new FormControl<string>('', Validators.required);
//     this.answerOptions.push(optionControl);
//   }

//   protected deleteAnswerOption(answerOptionIndex: number) {
//     this.answerOptions.removeAt(answerOptionIndex);
//   }

//   submitForm() {
//     if (!this._form.valid)
//       return;

//     console.log(this._form.value);
//     const question: Question = { ...this._form.value };
//     console.log(question);
//   }

// }
