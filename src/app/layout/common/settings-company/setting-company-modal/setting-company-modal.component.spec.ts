import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingCompanyModalComponent } from './setting-company-modal.component';

describe('SettingCompanyModalComponent', () => {
  let component: SettingCompanyModalComponent;
  let fixture: ComponentFixture<SettingCompanyModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingCompanyModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingCompanyModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
