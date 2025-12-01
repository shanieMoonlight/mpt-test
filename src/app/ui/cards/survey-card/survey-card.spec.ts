import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MptUiSurveyCard } from './survey-card';
import { ActivatedRoute, ParamMap, convertToParamMap } from '@angular/router';
import { Subject, BehaviorSubject, of } from 'rxjs';
import { SurveyDto } from '../../../data/models';
import { DummySurveys } from '../../../surveys';

//###########################//

const paramMapSubject: Subject<ParamMap> = new BehaviorSubject<ParamMap>(convertToParamMap({}));
const mockActRoute = {
  queryParamMap: of({ get: () => null }),
  paramMap: paramMapSubject.asObservable(),
}

const mockSurvey: SurveyDto = DummySurveys[0];

//###########################//

describe('MptSurveyCard', () => {
  let component: MptUiSurveyCard;
  let fixture: ComponentFixture<MptUiSurveyCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MptUiSurveyCard],
      providers: [
        { provide: ActivatedRoute, useValue: mockActRoute },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MptUiSurveyCard);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('survey', mockSurvey);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
