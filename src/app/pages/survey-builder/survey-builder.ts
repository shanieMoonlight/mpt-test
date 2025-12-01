import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MiniStateBuilder } from '@spider-baby/mini-state';
import { SbToastService } from '@spider-baby/ui-toast';
import { SurveyIoService } from '../../data/io';
import { SurveyDto } from '../../data/models/survey-dto';
import { SurveyStorage } from '../../services/survey-storage/survey-storage';
import { SurveyFormComponent } from '../../ui/forms/survey-form/survey-form';
import { NotificationsModal } from '../../ui/notifications/notifications/notifications.component';
import { Router } from '@angular/router';
import { MptAppRouteDefs } from '../../app-route-defs';

@Component({
  selector: 'mpt-survey-builder',
  imports: [
    NotificationsModal,
    SurveyFormComponent
  ],
  templateUrl: './survey-builder.html',
  styleUrl: './survey-builder.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MptSurveyBuilder {


  private _surveyIoService = inject(SurveyIoService);
  private _storage = inject(SurveyStorage);
  private _toaster = inject(SbToastService);
  private _router = inject(Router);

  //----------------//

  protected _draftSurvey = signal<SurveyDto | undefined>(undefined);

  constructor() {
    const draft = this._storage.getSurveyDraft();
    if (draft) {
      console.log('Loaded survey draft from storage:', draft, draft.questions?.[0].questionType);
      this._draftSurvey.set(draft);
      this._toaster.success(`Loaded survey draft from storage: ${draft.title}`);
    }
  }

  //----------------//

  private _createState = MiniStateBuilder
    .CreateWithInput((dto: SurveyDto) => this._surveyIoService.create(dto))
    .setSuccessMsgFn((dto: SurveyDto) => `Survey, ${dto.title} created successfully!`)
    .setOnSuccessFn(() => {
      //On success, clear any saved draft
      this._storage.removeSurveyDraft();
      // Optionally, navigate to survey list
      // this._router.navigateByUrl(`/${MptAppRouteDefs.route('survey-list')}`)
    })


  protected _successMsg = this._createState.successMsg;
  protected _errorMsg = this._createState.errorMsg;
  protected _loading = this._createState.loading;

  //----------------//

  protected createSurvey(dto: SurveyDto): void {
    console.log('dto', dto);
    this._createState.trigger(dto);
  }

  protected saveSurveyDraft(dto: SurveyDto): void {
    // console.log('Saving survey draft:', dto);
    this._storage.storeSurveyDraft(dto);
  }

  protected checkStoredDraft(): void {
    const draft = this._storage.getSurveyDraft();
    if (draft)
      console.log('Current stored draft:', draft);
    else
      console.log('No draft currently stored.');
  }


}//Cls
