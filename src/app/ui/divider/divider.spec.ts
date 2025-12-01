import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MptUiDivider } from './divider';

describe('Divider', () => {
  let component: MptUiDivider;
  let fixture: ComponentFixture<MptUiDivider>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MptUiDivider]
    }).compileComponents();

    fixture = TestBed.createComponent(MptUiDivider);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
