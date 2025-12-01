import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MiniStateBuilder } from '@spider-baby/mini-state';
import { MiniStateCombined } from '@spider-baby/mini-state/utils';
import { filter, map } from 'rxjs';
import { MptAppRouteDefs } from '../../app-route-defs';
import { SurveyIoService } from '../../data/io';
import { SurveyDto } from '../../data/models';
import { SurveyFormComponent } from '../../ui/forms/survey-form/survey-form';
import { NotificationsModal } from '../../ui/notifications/notifications/notifications.component';

@Component({
  selector: 'mpt-mpt-survey-detail',
  imports: [
    NotificationsModal,
    SurveyFormComponent
  ],
  templateUrl: './survey-detail.html',
  styleUrl: './survey-detail.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MptSurveyDetail {


  private _surveyIoService = inject(SurveyIoService);
  private _actRoute = inject(ActivatedRoute);

  //----------------//

  private _id$ = this._actRoute.paramMap.pipe(
    map((params: ParamMap) => params.get(MptAppRouteDefs.DETAIL_ID_PARAM) ?? undefined),
    filter((id: string | undefined): id is string => !!id)
  )

  protected _id = toSignal(this._id$);


  //Everytime _id$ changes, the _itemState will be triggered
  private _getState = MiniStateBuilder.CreateWithObservableInput(
    this._id$,
    (id: string) => this._surveyIoService.getById(id))

  private _updateState = MiniStateBuilder
    .CreateWithInput((dto: SurveyDto) => this._surveyIoService.update(dto.id!, dto))
    .setSuccessMsgFn((dto: SurveyDto) => `Survey, ${dto.title} updated successfully!`)

  private _notificationStates = MiniStateCombined.Combine(
    this._getState,
    this._updateState
  )

  protected _survey = this._getState.data;
  protected _successMsg = this._notificationStates.successMsg;
  protected _errorMsg = this._notificationStates.errorMsg;
  protected _loading = this._notificationStates.loading;


  //TODO: Remove when backend is ready
  // protected _survey = signal<SurveyDto>(DummySurveys[0]) //Temporary until backend is ready
  // protected _successMsg = signal<string | undefined>(undefined);
  // protected _errorMsg = signal<string | undefined>(undefined);
  // protected _loading = signal<boolean>(false);


  protected updateSurvey(survey: SurveyDto): void {
    console.log('Updating survey ????:', survey);
    this._updateState.trigger(survey);
  }


}//Cls
