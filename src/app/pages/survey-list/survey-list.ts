import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { MiniStateBuilder } from '@spider-baby/mini-state';
import { SurveyIoService } from '../../data/io';
import { MptUiSurveyCard } from '../../ui/cards/survey-card/survey-card';
import { NotificationsModal } from '../../ui/notifications/notifications/notifications.component';
import { SurveyDto } from '../../data/models';

@Component({
  selector: 'mpt-mpt-survey-list',
  imports: [
    NotificationsModal,
    MptUiSurveyCard
  ],
  templateUrl: './survey-list.html',
  styleUrl: './survey-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MptSurveyList {


  private _surveyIoService = inject(SurveyIoService);

  //----------------//


  private _surveysState = MiniStateBuilder
    .Create(() => this._surveyIoService.getAll())
    .trigger();//Trigger immediately


  protected _data = computed(() => this._surveysState.data() ?? new Array<SurveyDto>());
  protected _successMsg = this._surveysState.successMsg;
  protected _errorMsg = this._surveysState.errorMsg;
  protected _loading = this._surveysState.loading;

  // protected _data = signal<SurveyDto[]>(DummySurveys) //Temporary until backend is ready
  // protected _successMsg = signal<string | undefined>(undefined);
  // protected _errorMsg = signal<string | undefined>(undefined);
  // protected _loading = signal<boolean>(false);



}//Cls
