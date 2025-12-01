import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { EmpathyTheme } from '../../theme';

@Component({
  selector: 'mpt-ui-button',
  standalone: true,
  imports: [NgClass],
  template: `
    <button
      [type]="type()"
      [disabled]="disabled()"
      class="mpt-btn"
      [ngClass]="color()">
      <ng-content/>
    </button>
  `,
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MptUiButtonComponent {

  disabled = input<boolean>(false);

  color = input<EmpathyTheme>('primary')
  type = input<'button' | 'submit' | 'reset'>('button');


}
