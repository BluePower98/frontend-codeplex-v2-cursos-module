import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingSucursalModalComponent } from './setting-sucursal-modal.component';

describe('SettingSucursalModalComponent', () => {
  let component: SettingSucursalModalComponent;
  let fixture: ComponentFixture<SettingSucursalModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingSucursalModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingSucursalModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
