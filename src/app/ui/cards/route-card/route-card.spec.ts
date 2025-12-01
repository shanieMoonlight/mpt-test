import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, ParamMap } from '@angular/router';
import { BehaviorSubject, of, Subject } from 'rxjs';
import { MptUiRouteCard } from './route-card';
import { SurveyDto } from '../../../data/models';
import { DummySurveys } from '../../../surveys';

//###########################//

const paramMapSubject: Subject<ParamMap> = new BehaviorSubject<ParamMap>(convertToParamMap({}));
const mockActRoute = {
  queryParamMap: of({ get: () => null }),
  paramMap: paramMapSubject.asObservable(),
}


//###########################//

describe('MptUiRouteCard', () => {
  let component: MptUiRouteCard;
  let fixture: ComponentFixture<MptUiRouteCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MptUiRouteCard],
      providers: [
        { provide: ActivatedRoute, useValue: mockActRoute },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MptUiRouteCard);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('title', 'Test Title');
    fixture.componentRef.setInput('route', '/test-route');
    fixture.componentRef.setInput('icon', 'face');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
