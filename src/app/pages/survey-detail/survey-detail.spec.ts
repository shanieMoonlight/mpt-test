import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, ParamMap } from '@angular/router';
import { EmpathyIoSetup } from '../../data/io/setup';
import { MptSurveyDetail } from './survey-detail';
import { BehaviorSubject, of, Subject } from 'rxjs';
import { SurveyIoService } from '../../data/io';
import { MptAppRouteDefs } from '../../app-route-defs';
import { By } from '@angular/platform-browser';
import { NotificationsModal } from '../../ui/notifications/notifications/notifications.component';

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
  let mockSurveyIo: Partial<Record<keyof SurveyIoService, jest.Mock>> & { getById?: jest.Mock; update?: jest.Mock };

  beforeEach(async () => {
    mockSurveyIo = {
      getById: jest.fn().mockReturnValue(of(null)),
      update: jest.fn().mockReturnValue(of(null)),
    };

    await TestBed.configureTestingModule({
      imports: [MptSurveyDetail],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: ActivatedRoute, useValue: mockActRoute },
        { provide: SurveyIoService, useValue: mockSurveyIo },
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

  it('calls getById when route param id is emitted and exposes survey', () => {
    const sample = { id: 'abc', title: 'My Survey' } as any;
    (mockSurveyIo.getById as jest.Mock).mockReturnValueOnce(of(sample));

    // emit a paramMap with the expected id key
    paramMapSubject.next(convertToParamMap({ [MptAppRouteDefs.DETAIL_ID_PARAM]: 'abc' }));
    fixture.detectChanges();

    const svc = TestBed.inject(SurveyIoService) as any;
    expect(svc.getById).toHaveBeenCalledWith('abc');

    // the component exposes _survey as a signal; read it from the instance
    const survey = (component as any)._survey();
    expect(survey).toEqual(sample);
  });

  it('updateSurvey calls SurveyIoService.update with provided dto', () => {
    const updated = { id: 'u1', title: 'Updated' } as any;
    (mockSurveyIo.update as jest.Mock).mockReturnValueOnce(of(updated));

    // call updateSurvey
    (component as any).updateSurvey(updated);

    const svc = TestBed.inject(SurveyIoService) as any;
    expect(svc.update).toHaveBeenCalledWith('u1', updated);
  });

  it('renders notifications modal and binds inputs', () => {
    const notificationsEl = fixture.debugElement.query(By.directive(NotificationsModal));
    expect(notificationsEl).toBeTruthy();
    const modal: any = notificationsEl.componentInstance;
    expect(modal.isLoading()).toBe(false);
    expect(modal.errorMsg()).toBeUndefined();
    expect(modal.successMsg()).toBeUndefined();
  });
});
