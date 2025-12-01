import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { EmpathyTheme } from '../../theme';
import { MptUiIcon } from '../../icon/icon';

@Component({
  selector: 'mpt-ui-icon-button',
  standalone: true,
  imports: [
    NgClass,
    MptUiIcon
  ],
  template: `
    <button
      #btn
      [type]="type()"
      [disabled]="disabled()"
      class="mpt-icon-btn"
      [ngClass]="theme()">
      <mpt-ui-icon> {{iconName() }}</mpt-ui-icon>
      <!-- <i class="material-icons">{{ iconName() }}</i> -->
    </button>
  `,
  styleUrls: ['./icon-button.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MptUiIconButton {
  
  disabled = input<boolean>(false);
  theme = input<EmpathyTheme>('primary');
  type = input<'button' | 'submit' | 'reset'>('button');
  iconName = input<string>();

}
