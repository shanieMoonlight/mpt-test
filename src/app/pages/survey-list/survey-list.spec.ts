import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, ParamMap } from '@angular/router';
import { BehaviorSubject, of, Subject } from 'rxjs';
import { SurveyIoService } from '../../data/io';
import { EmpathyIoSetup } from '../../data/io/setup';
import { MptSurveyList } from './survey-list';
import { By } from '@angular/platform-browser';
import { NotificationsModal } from '../../ui/notifications/notifications/notifications.component';


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
  let mockSurveyIo: Partial<Record<keyof SurveyIoService, jest.Mock>> & { getAll?: jest.Mock };

  beforeEach(async () => {
    mockSurveyIo = {
      getAll: jest.fn().mockReturnValue(of([])),
    };

    await TestBed.configureTestingModule({
      imports: [MptSurveyList],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: ActivatedRoute, useValue: mockActRoute },
        { provide: SurveyIoService, useValue: mockSurveyIo },
        // keep EmpathyIoSetup available for other dependencies if needed
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

  it('calls SurveyIoService.getAll on init', () => {
    const svc = TestBed.inject(SurveyIoService) as any;
    expect(svc.getAll).toHaveBeenCalled();
  });

  it('exposes data from service when non-empty', async () => {
    const sample = [{ id: 's1', title: 'One' }];
    (mockSurveyIo.getAll as jest.Mock).mockReturnValueOnce(of(sample));

    // recreate with new provider behavior
    const f2 = TestBed.createComponent(MptSurveyList);
    const cmp2 = f2.componentInstance as any;
    f2.detectChanges();

    // _data is a computed signal — call it to get current value
    const val = cmp2._data();
    expect(Array.isArray(val)).toBe(true);
    expect(val.length).toBe(1);
    expect(val[0].id).toBe('s1');
  });

  it('returns empty array when service provides null/undefined', async () => {
    (mockSurveyIo.getAll as jest.Mock).mockReturnValueOnce(of(null));

    const f3 = TestBed.createComponent(MptSurveyList);
    const cmp3 = f3.componentInstance as any;
    f3.detectChanges();

    const val = cmp3._data();
    expect(Array.isArray(val)).toBe(true);
    expect(val.length).toBe(0);
  });

  it('renders mpt-notifications-modal in template', () => {
    const notificationsEl = fixture.debugElement.query(By.css('mpt-notifications-modal'));
    expect(notificationsEl).toBeTruthy();
  });

  it('passes isLoading, errorMsg and successMsg to notifications modal', () => {
    const notificationsEl = fixture.debugElement.query(By.directive(NotificationsModal));
    expect(notificationsEl).toBeTruthy();
    const modalInstance: any = notificationsEl.componentInstance;
    expect(modalInstance.isLoading()).toBe(false);
    expect(modalInstance.errorMsg()).toBeUndefined();
    expect(modalInstance.successMsg()).toBeUndefined();
  });
});
