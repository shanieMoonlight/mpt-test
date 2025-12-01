import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotificationsModal } from './notifications.component';

describe('SuccessModalComponent', () => {
  let component: NotificationsModal;
  let fixture: ComponentFixture<NotificationsModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificationsModal],
    }).compileComponents();

    fixture = TestBed.createComponent(NotificationsModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
