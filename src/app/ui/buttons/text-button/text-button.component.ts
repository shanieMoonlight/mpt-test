import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { EmpathyTheme } from '../../theme';

@Component({
  selector: 'mpt-ui-text-button',
  standalone: true,
  imports: [NgClass],
  template: `
    <button
      [type]="type()"
      [disabled]="disabled()"
      class="mpt-text-button"
      [ngClass]="theme()">
      <ng-content/>
    </button>
  `,
  styleUrls: ['./text-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MptUiTextButton {

  disabled = input<boolean>(false);

  theme = input<EmpathyTheme>('primary');
  type = input<'button' | 'submit' | 'reset'>('button');

}
