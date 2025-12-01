import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, ParamMap } from '@angular/router';
import { BehaviorSubject, of, Subject } from 'rxjs';
import { EmpathyIoSetup } from '../../data/io/setup';
import { MptSurveyBuilder } from './survey-builder';
import { SurveyStorage } from '../../services/survey-storage/survey-storage';
import { SurveyIoService } from '../../data/io';
import { SbToastService } from '@spider-baby/ui-toast';
import { By } from '@angular/platform-browser';
import { NotificationsModal } from '../../ui/notifications/notifications/notifications.component';

//###########################//

const paramMapSubject: Subject<ParamMap> = new BehaviorSubject<ParamMap>(convertToParamMap({}));
const mockActRoute = {
  queryParamMap: of({ get: () => null }),
  paramMap: paramMapSubject.asObservable() ,
}

//###########################//

describe('MptSurveyBuilder', () => {
  let component: MptSurveyBuilder;
  let fixture: ComponentFixture<MptSurveyBuilder>;
  let mockStorage: Partial<Record<keyof SurveyStorage, jest.Mock>> & { getSurveyDraft?: jest.Mock };
  let mockSurveyIo: Partial<Record<keyof SurveyIoService, jest.Mock>> & { create?: jest.Mock };
  let mockToaster: Partial<Record<keyof SbToastService, jest.Mock>>;

  beforeEach(async () => {
    mockStorage = {
      getSurveyDraft: jest.fn().mockReturnValue(undefined),
      storeSurveyDraft: jest.fn(),
      removeSurveyDraft: jest.fn(),
    } as any;

    mockSurveyIo = {
      create: jest.fn().mockReturnValue(of(undefined)),
    } as any;

    mockToaster = {
      success: jest.fn(),
    } as any;

    await TestBed.configureTestingModule({
      imports: [MptSurveyBuilder],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: ActivatedRoute, useValue: mockActRoute },
        { provide: SurveyStorage, useValue: mockStorage },
        { provide: SurveyIoService, useValue: mockSurveyIo },
        { provide: SbToastService, useValue: mockToaster },
        ...EmpathyIoSetup.provideEmpathyIo({
          baseUrl: 'http://localhost',
          authEmail: 'test@example.com',
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MptSurveyBuilder);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('loads draft from storage in constructor and calls toaster.success when draft exists', () => {
    const sample = { id: 'd1', title: 'Draft Survey', questions: [{ questionType: 'CHOICE' }] } as any;
    (mockStorage.getSurveyDraft as jest.Mock).mockReturnValueOnce(sample);

    // create a fresh component instance that will run the constructor
    const f2 = TestBed.createComponent(MptSurveyBuilder);
    const cmp2 = f2.componentInstance as any;
    f2.detectChanges();

    expect(mockStorage.getSurveyDraft).toHaveBeenCalled();
    expect(cmp2._draftSurvey()).toEqual(sample);
    expect(mockToaster.success).toHaveBeenCalledWith(expect.stringContaining(sample.title));
  });

  it('createSurvey triggers the create state trigger', () => {
    const dto = { id: 'c1', title: 'Create me' } as any;
    // replace the internal _createState.trigger with a spy so we don't depend on MiniState internals
    const triggerSpy = jest.fn();
    (component as any)._createState = { trigger: triggerSpy } as any;

    (component as any).createSurvey(dto);

    expect(triggerSpy).toHaveBeenCalledWith(dto);
  });

  it('saveSurveyDraft calls storage.storeSurveyDraft', () => {
    const dto = { id: 's1', title: 'Save me' } as any;
    (component as any).saveSurveyDraft(dto);
    expect(mockStorage.storeSurveyDraft).toHaveBeenCalledWith(dto);
  });


  it('checkStoredDraft calls storage.getSurveyDraft', () => {
    (component as any).checkStoredDraft();
    expect(mockStorage.getSurveyDraft).toHaveBeenCalled();
  });

  
  it('renders notifications modal and binds inputs', () => {
    const notificationsEl = fixture.debugElement.query(By.directive(NotificationsModal));
    expect(notificationsEl).toBeTruthy();
    const modal: any = notificationsEl.componentInstance;
    // The inputs may be plain values or signal functions depending on template binding
    const resolveMaybeSignal = (v: any): any => {
      if (typeof v === 'function') return resolveMaybeSignal(v());
      return v;
    };

    const isLoadingVal = resolveMaybeSignal(modal.isLoading);
    const errorVal = resolveMaybeSignal(modal.errorMsg);
    const successVal = resolveMaybeSignal(modal.successMsg);

    expect(isLoadingVal).toBe(false);
    expect(errorVal).toBeUndefined();
    expect(successVal).toBeUndefined();
  });
});
