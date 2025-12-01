import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoaderModal } from './loader.modal';

describe('LoaderModalComponent', () => {
  let component: LoaderModal;
  let fixture: ComponentFixture<LoaderModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoaderModal],
    }).compileComponents();

    fixture = TestBed.createComponent(LoaderModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
