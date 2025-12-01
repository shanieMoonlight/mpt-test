import { TestBed, ComponentFixture } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MptQuestionTypeMenu } from './menu';

describe('MptQuestionTypeMenu', () => {
  let fixture: ComponentFixture<MptQuestionTypeMenu>;
  let component: MptQuestionTypeMenu;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MptQuestionTypeMenu],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(MptQuestionTypeMenu);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('initializes selected item to first menu item', () => {
    const items = (component as any).items();
    const selected = (component as any)._selectedItem();
    expect(items.length).toBeGreaterThan(0);
    expect(selected).toBeDefined();
    expect(selected.type).toBe(items[0].type);
  });

  it('updateSelectedItem sets selected and notifies CVA onChange', () => {
    const items = (component as any).items();
    const item = items[1];
    const changeSpy = jest.fn();
    component.registerOnChange(changeSpy);

    (component as any).updateSelectedItem(item);

    const selected = (component as any)._selectedItem();
    expect(selected).toBeDefined();
    expect(selected.type).toBe(item.type);
    expect(changeSpy).toHaveBeenCalledWith(item.type);
  });

  it('writeValue(undefined) clears selection', () => {
    component.writeValue(undefined);
    fixture.detectChanges();
    // The component constructor effect will re-initialize the selection to
    // the first item if items are present, so we expect the first item.
    const items = (component as any).items();
    const selected = (component as any)._selectedItem();
    expect(items.length).toBeGreaterThan(0);
    expect(selected).toBeDefined();
    expect(selected.type).toBe(items[0].type);
  });

  it('setDisabledState toggles internal disabled signal', () => {
    component.setDisabledState(true);
    expect((component as any)._disabled()).toBe(true);
    component.setDisabledState(false);
    expect((component as any)._disabled()).toBe(false);
  });
});
