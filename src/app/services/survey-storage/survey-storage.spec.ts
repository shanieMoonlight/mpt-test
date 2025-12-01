import { TestBed } from '@angular/core/testing';
import { SurveyStorage, SURVEY_KEY } from './survey-storage';
import { SsrLocalStorage } from '@spider-baby/ssr-storage';
import { SurveyDto } from '../../data/models';

describe('SurveyStorage', () => {
  let service: SurveyStorage;
  const mockLocalStorage = {
    setItem: jest.fn(),
    removeItem: jest.fn(),
    getItem: jest.fn(),
  } as unknown as SsrLocalStorage;

  beforeEach(() => {
    jest.clearAllMocks();
    TestBed.configureTestingModule({
      providers: [
        SurveyStorage,
        { provide: SsrLocalStorage, useValue: mockLocalStorage },
      ],
    });
    service = TestBed.inject(SurveyStorage);
  });

  it('storeSurveyDraft calls setItem with key and JSON string when survey provided', () => {
    const survey: SurveyDto = { id: 's1', title: 'T', description: 'D', questions: [] } as any;
    service.storeSurveyDraft(survey);
    expect(mockLocalStorage.setItem).toHaveBeenCalledTimes(1);
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith(SURVEY_KEY, JSON.stringify(survey));
  });

  it('storeSurveyDraft with undefined calls removeItem', () => {
    service.storeSurveyDraft(undefined);
    expect(mockLocalStorage.removeItem).toHaveBeenCalledTimes(1);
    expect(mockLocalStorage.removeItem).toHaveBeenCalledWith(SURVEY_KEY);
  });

  it('removeSurveyDraft calls removeItem', () => {
    service.removeSurveyDraft();
    expect(mockLocalStorage.removeItem).toHaveBeenCalledTimes(1);
    expect(mockLocalStorage.removeItem).toHaveBeenCalledWith(SURVEY_KEY);
  });

  it('getSurveyDraft returns parsed object when present', () => {
    const survey: SurveyDto = { id: 's2', title: 'T2', description: 'D2', questions: [] } as any;
    mockLocalStorage.getItem = jest.fn().mockReturnValue(JSON.stringify(survey));
    const result = service.getSurveyDraft();
    expect(result).toEqual(survey);
  });

  it('getSurveyDraft returns null when nothing stored', () => {
    mockLocalStorage.getItem = jest.fn().mockReturnValue(null);
    const result = service.getSurveyDraft();
    expect(result).toBeNull();
  });
});