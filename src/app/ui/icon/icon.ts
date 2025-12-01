import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { EmpathyTheme } from '../theme';

@Component({
  selector: 'mpt-ui-icon',
  standalone: true,
  imports: [],
  template: `
      <i class="material-icons">
        <ng-content/>
      </i>
  `,
  styleUrls: ['./icon.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'theme()',
    '[style.--icon-size-px]': 'iconSizePx() + "px"'
  },
})
export class MptUiIcon {

  theme = input<EmpathyTheme | undefined>(undefined);
  iconSizePx = input<number>(24);

}
