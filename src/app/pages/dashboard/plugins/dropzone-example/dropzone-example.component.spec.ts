import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropzoneExampleComponent } from './dropzone-example.component';

describe('DropzoneExampleComponent', () => {
  let component: DropzoneExampleComponent;
  let fixture: ComponentFixture<DropzoneExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DropzoneExampleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DropzoneExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
