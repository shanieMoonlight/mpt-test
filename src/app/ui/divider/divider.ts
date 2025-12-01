import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { EmpathyTheme } from '../theme';

@Component({
  selector: 'mpt-ui-divider',
  imports: [],
  template: ``,
  styleUrl: './divider.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'theme()'
  },
})
export class MptUiDivider {
  
  theme = input<EmpathyTheme | undefined>(undefined);
}
