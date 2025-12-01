import { ChangeDetectionStrategy, Component, Input, output, signal } from '@angular/core';
import { MptUiIconButton } from '../../buttons/icon-button/icon-button';
import { MptUiTextButton } from '../../buttons/text-button/text-button.component';
import { MptUiDivider } from '../../divider/divider';
import { MptUiIcon } from '../../icon/icon';

@Component({
  selector: 'mpt-error-modal',
  standalone: true,
  imports: [
    MptUiIconButton,
    MptUiTextButton,
    MptUiDivider,
    MptUiIcon
  ],
  templateUrl: './error.modal.html',
  styleUrls: ['./error.modal.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorModal {

  _errorMsg = signal<string | undefined>(undefined);
  @Input()
  set errorMsg(message: string | null | undefined) {
    this._errorMsg.set(message ?? undefined);
  }

  _dismissError = output({ alias: 'dismiss' })



  protected dismissError(): void {
    this._errorMsg.set(undefined)
    console.log('dismissError', this._errorMsg())
  }

}//Cls
