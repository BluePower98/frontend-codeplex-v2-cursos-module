import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GruposModalComponent } from './grupos-modal.component';

describe('GruposModalComponent', () => {
  let component: GruposModalComponent;
  let fixture: ComponentFixture<GruposModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GruposModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GruposModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
