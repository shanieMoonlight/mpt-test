import { inject, Injectable } from '@angular/core';
import { SsrLocalStorage } from '@spider-baby/ssr-storage';
import { SurveyDto } from '../../data/models';

//###########################//

/** Storage Key*/
export const SURVEY_KEY = 'empathy_survey_key'

//###########################//

@Injectable({
  providedIn: 'root',
})
export class SurveyStorage {


  protected _localStorage = inject(SsrLocalStorage)

  //------------------//

  /**
   *  Store survey in storage
   * @param survey Store survey. If survey is undefined, will remove survey from storage
   */
  storeSurveyDraft = (survey?: SurveyDto): void =>
    !survey
      ? this.removeSurveyDraft()
      : this._localStorage.setItem(SURVEY_KEY, JSON.stringify(survey))


  /**
   * Remove survey from storage
   */
  removeSurveyDraft = (): void =>
    this._localStorage.removeItem(SURVEY_KEY)



  /**Get survey from storage*/
  getSurveyDraft(): SurveyDto | null {
    const surveyDataString = this._localStorage.getItem(SURVEY_KEY);
    return surveyDataString
      ? JSON.parse(surveyDataString)
      : null;
  }



}//Cls
