import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NotificationsModal } from './notifications.component';
import { ErrorModal } from '../error/error.modal';
import { SuccessModal } from '../success/success.modal';
import { LoaderModal } from '../loader/loader.modal';

describe('NotificationsModal', () => {
  let fixture: ComponentFixture<NotificationsModal>;
  let component: NotificationsModal;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificationsModal],
    }).compileComponents();

    fixture = TestBed.createComponent(NotificationsModal);
    component = fixture.componentInstance;
  });

  it('creates', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('forwards `errorMsg` to ErrorModal and renders the error content', () => {
    const msg = 'Error occurred';
    fixture.componentRef.setInput('errorMsg', msg);
    fixture.detectChanges();

    // Find the child ErrorModal component and verify its input was set
    const errorDe = fixture.debugElement.query(By.directive(ErrorModal));
    expect(errorDe).toBeTruthy();
    const errorComp = errorDe.componentInstance as ErrorModal;
    // internal signal `_errorMsg` should reflect the forwarded input
    expect((errorComp as any)._errorMsg()).toBe(msg);
  });

  it('forwards `successMsg` to SuccessModal and renders the success content', () => {
    const msg = 'It worked';
    fixture.componentRef.setInput('successMsg', msg);
    fixture.detectChanges();

    const successDe = fixture.debugElement.query(By.directive(SuccessModal));
    expect(successDe).toBeTruthy();
    const successComp = successDe.componentInstance as SuccessModal;
    expect((successComp as any)._successMsg()).toBe(msg);
  });

  it('forwards loading inputs to LoaderModal and shows spinner and message', () => {
    fixture.componentRef.setInput('isLoading', true);
    fixture.componentRef.setInput('loadingMessage', 'Loading something');
    fixture.detectChanges();

    const loaderDe = fixture.debugElement.query(By.directive(LoaderModal));
    expect(loaderDe).toBeTruthy();
    const loaderComp = loaderDe.componentInstance as LoaderModal;
    expect((loaderComp as any).isLoading()).toBe(true);
    expect((loaderComp as any).loadingMessage()).toBe('Loading something');
  });
});