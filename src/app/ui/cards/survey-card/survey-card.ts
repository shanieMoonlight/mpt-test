import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MptAppRouteDefs } from '../../../app-route-defs';
import { SurveyDto } from '../../../data/models';
import { EmpathyTheme } from '../../theme';

@Component({
  selector: 'mpt-ui-survey-card',
  imports: [
    RouterLink
  ],
  templateUrl: './survey-card.html',
  styleUrls: ['./survey-card.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'theme()'
  },
})
export class MptUiSurveyCard {

  theme = input<EmpathyTheme | undefined>('primary');
  survey = input.required<SurveyDto>();

  protected surveyDetailRoute = computed(() =>
    `/${MptAppRouteDefs.route('survey-detail')}/${this.survey().id}`
  );



}//Cls
