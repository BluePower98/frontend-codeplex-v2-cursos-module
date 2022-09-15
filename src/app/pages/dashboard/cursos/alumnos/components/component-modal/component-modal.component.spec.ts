import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentModalComponent } from './component-modal.component';

describe('ComponentModalComponent', () => {
  let component: ComponentModalComponent;
  let fixture: ComponentFixture<ComponentModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComponentModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
