import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MptUiIcon } from '../../icon/icon';
import { EmpathyTheme } from '../../theme';


@Component({
  selector: 'mpt-ui-route-card',
  imports: [
    RouterLink,
    MptUiIcon
  ],
  templateUrl: './route-card.html',
  styleUrl: './route-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'theme()'
  },
})
export class MptUiRouteCard {

  theme = input<EmpathyTheme | undefined>('primary');
  title = input.required<string>();
  route = input.required<string>();
  icon = input.required<string>();

}//Cls
