import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { EmpathyTheme } from '../../theme';

@Component({
  selector: 'mpt-loader-modal',
  standalone: true,
  imports: [],
  templateUrl: './loader.modal.html',
  styleUrls: ['./loader.modal.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'theme()',
  },
})
export class LoaderModal {

  loadingMessage = input<string | undefined>('');
  isLoading = input<boolean>(false);
  theme = input<EmpathyTheme | undefined>(undefined);

}
