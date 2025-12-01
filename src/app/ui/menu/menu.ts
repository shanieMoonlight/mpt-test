import { ChangeDetectionStrategy, Component, input, output, signal, forwardRef, effect } from '@angular/core';
import { EmpathyTheme } from '../theme';
import { QuestionTypeMenuItem } from './menu-item';
import { CdkMenu, CdkMenuItem, CdkMenuTrigger } from '@angular/cdk/menu';
import { MptMenuSelectorButton } from './selector-button/selector-button';
import { QuestionType } from '../../data/models/question-type';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

//######################################//

const DEFAULT_MENU_ITEMS: QuestionTypeMenuItem[] = [
  { type: QuestionType.singleChoice, icon: 'check_circle', label: 'Single-Choice' },
  // { icon: 'radio_button_checked', label: 'Single-Choice' },
  { type: QuestionType.multipleChoice, icon: 'check_box', label: 'Multiple-Choice' },
  { type: QuestionType.singleLineInput, icon: 'short_text', label: 'Single-Line input' },
  { type: QuestionType.dropdownList, icon: 'arrow_drop_down', label: 'Dropdown List' },
];

//######################################//

@Component({
  selector: 'mpt-question-type-menu',
  standalone: true,
  imports: [
    CdkMenu,
    CdkMenuItem,
    CdkMenuTrigger,
    MptMenuSelectorButton
  ],
  templateUrl: './menu.html',
  styleUrls: ['./menu.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MptQuestionTypeMenu),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'theme()'
  },
})
export class MptQuestionTypeMenu implements ControlValueAccessor {

  items = input<QuestionTypeMenuItem[]>(DEFAULT_MENU_ITEMS);
  theme = input<EmpathyTheme>('primary');
  selectedItem = output<QuestionTypeMenuItem>();

  // ControlValueAccessor callbacks
  protected _disabled = signal(false);

  protected _selectedItem = signal<QuestionTypeMenuItem | undefined>(undefined);

  //----------------//

  constructor() {
    effect(() => { //In case items is changed externally...
      const items = this.items();
      if (items.length && !this._selectedItem())
        this.writeValue(items[0].type);
    })
  }


  protected updateSelectedItem(item: QuestionTypeMenuItem) {
    this._selectedItem.set(item);
    // propagate value to reactive forms / ngModel
    this._onChange(item.type);
    this._onTouched();
  }


  //=======================//
  // ControlValueAccessor methods
  //=======================//
  

  writeValue(value: number | undefined): void {
    
    if (!value) {
      this._selectedItem.set(undefined);
    } else {
      const item = this.items().find(i => i.type === value);
      this._selectedItem.set(item);
    }
  }

  
  // CVA callbacks
  private _onChange: (value: QuestionType | undefined) => void = () => { };
  private _onTouched: () => void = () => { };


  registerOnChange(fn: (value: QuestionType | undefined) => void): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this._onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this._disabled.set(!!isDisabled);
  }

}//Cls
