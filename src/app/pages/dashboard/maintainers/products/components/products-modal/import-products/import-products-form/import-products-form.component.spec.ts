import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportProductsFormComponent } from './import-products-form.component';

describe('ImportProductsFormComponent', () => {
  let component: ImportProductsFormComponent;
  let fixture: ComponentFixture<ImportProductsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportProductsFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportProductsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
