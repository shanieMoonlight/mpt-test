import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MptSwitchComponent } from './switch.component';

describe('MptSwitchComponent', () => {
  let fixture: ComponentFixture<MptSwitchComponent>;
  let component: MptSwitchComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MptSwitchComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MptSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('writeValue updates checked and input element', () => {
    component.writeValue(true);
    fixture.detectChanges();
    const input: HTMLInputElement = fixture.debugElement.query(By.css('input')).nativeElement;
    expect(component.checked()).toBe(true);
    expect(input.checked).toBe(true);
  });

  it('toggling input emits checkedChange and notifies CVA onChange', () => {
    const changeSpy = jest.fn();

    component.registerOnChange(changeSpy);

    const inputDe = fixture.debugElement.query(By.css('input'));
    const input: HTMLInputElement = inputDe.nativeElement;

    // simulate user checking the switch
    input.checked = true;
    input.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    expect(component.checked()).toBe(true);
    expect(changeSpy).toHaveBeenCalledWith(true);
  });

  it('disabled state prevents toggling and does not notify', () => {
    const changeSpy = jest.fn();
    component.registerOnChange(changeSpy);

    component.setDisabledState(true);
    fixture.detectChanges();

    const input: HTMLInputElement = fixture.debugElement.query(By.css('input')).nativeElement;
    expect(input.disabled).toBe(true);

    const prev = component.checked();
    input.checked = !prev;
    input.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    // change should not be propagated and value should remain unchanged
    expect(changeSpy).not.toHaveBeenCalled();
    expect(component.checked()).toBe(prev);
  });
});
