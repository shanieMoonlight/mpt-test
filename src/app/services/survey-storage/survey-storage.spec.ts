import { TestBed } from '@angular/core/testing';

import { SurveyStorage } from './survey-storage';

describe('SurveyStorage', () => {
  let service: SurveyStorage;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SurveyStorage);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
