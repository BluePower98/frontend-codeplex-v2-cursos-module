import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ng2selectExampleComponent } from './ng2select-example.component';

describe('Ng2selectExampleComponent', () => {
  let component: Ng2selectExampleComponent;
  let fixture: ComponentFixture<Ng2selectExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Ng2selectExampleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Ng2selectExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
