import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingDatesModalComponent } from './setting-dates-modal.component';

describe('SettingDatesModalComponent', () => {
  let component: SettingDatesModalComponent;
  let fixture: ComponentFixture<SettingDatesModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingDatesModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingDatesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
