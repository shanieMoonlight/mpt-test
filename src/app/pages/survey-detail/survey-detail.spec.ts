import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, ParamMap } from '@angular/router';
import { EmpathyIoSetup } from '../../data/io/setup';
import { MptSurveyDetail } from './survey-detail';
import { BehaviorSubject, of, Subject } from 'rxjs';

//###########################//

const paramMapSubject: Subject<ParamMap> = new BehaviorSubject<ParamMap>(convertToParamMap({}));
const mockActRoute = {
  queryParamMap: of({ get: () => null }),
  paramMap: paramMapSubject.asObservable() ,
}

//###########################//

describe('MptSurveyDetail', () => {
  let component: MptSurveyDetail;
  let fixture: ComponentFixture<MptSurveyDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MptSurveyDetail],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: ActivatedRoute, useValue: mockActRoute },
        ...EmpathyIoSetup.provideEmpathyIo({
          baseUrl: 'http://localhost',
          authEmail: 'test@example.com',
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MptSurveyDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
