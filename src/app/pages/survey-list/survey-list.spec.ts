import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, ParamMap } from '@angular/router';
import { BehaviorSubject, of, Subject } from 'rxjs';
import { EmpathyIoSetup } from '../../data/io/setup';
import { MptSurveyList } from './survey-list';


//###########################//

const paramMapSubject: Subject<ParamMap> = new BehaviorSubject<ParamMap>(convertToParamMap({}));
const mockActRoute = {
  queryParamMap: of({ get: () => null }),
  paramMap: paramMapSubject.asObservable() ,
}

//###########################//

describe('MptSurveyList', () => {
  let component: MptSurveyList;
  let fixture: ComponentFixture<MptSurveyList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MptSurveyList],
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

    fixture = TestBed.createComponent(MptSurveyList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
