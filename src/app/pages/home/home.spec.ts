import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MptHome } from './home';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

//###########################//

const mockActRoute = {
  queryParamMap: of({ get: () => null })
}

//###########################//

describe('Home', () => {
  let component: MptHome;
  let fixture: ComponentFixture<MptHome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MptHome],
      providers: [
        { provide: ActivatedRoute, useValue: mockActRoute },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MptHome);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
