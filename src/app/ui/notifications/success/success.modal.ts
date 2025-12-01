import { ChangeDetectionStrategy, Component, input, Input, output, signal } from '@angular/core';
import { MptUiIconButton } from '../../buttons/icon-button/icon-button';
import { MptUiTextButton } from '../../buttons/text-button/text-button.component';
import { MptUiDivider } from '../../divider/divider';
import { MptUiIcon } from '../../icon/icon';

@Component({
  selector: 'mpt-success-modal',
  standalone: true,
  imports: [
    MptUiIconButton,
    MptUiTextButton,
    MptUiDivider,
    MptUiIcon
  ],
  templateUrl: './success.modal.html',
  styleUrls: ['./success.modal.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SuccessModal {

  _successMsg = signal<string | undefined>(undefined);
  @Input()
  set successMsg(message: string | null | undefined) {
    this._successMsg.set(message ?? undefined);
  }

  title = input<string>('Success');

  dismissed = output();

  protected dismissSuccess() {
    this._successMsg.set(undefined);
    this.dismissed.emit();
  }

}
