import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropzoneUploadComponent } from './dropzone-upload.component';

describe('DropzoneUploadComponent', () => {
  let component: DropzoneUploadComponent;
  let fixture: ComponentFixture<DropzoneUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DropzoneUploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DropzoneUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
