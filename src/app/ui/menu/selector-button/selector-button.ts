import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { QuestionTypeMenuItem } from '../menu-item';
import { EmpathyTheme } from '../../theme';

/**
 * Small presentational button used inside menus/selectors.
 * - `item` must match the `MenuItem` shape (icon + label).
 * - `data-testid` is set to the item's label to support tests.
 */
@Component({
  selector: 'mpt-menu-selector-button',
  standalone: true,
  templateUrl: './selector-button.html',
  styleUrls: ['./selector-button.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'theme()'
  },
})
export class MptMenuSelectorButton {

  /** Menu item providing icon + label */
  item = input<QuestionTypeMenuItem>();
  theme = input<EmpathyTheme>('primary');

  nonthingSelectedText = input<string>('Select Question Type');

  /** Optional visual selected state */
  selected = input<boolean>(false);

}
