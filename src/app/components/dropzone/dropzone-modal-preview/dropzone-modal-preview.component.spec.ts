import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropzoneModalPreviewComponent } from './dropzone-modal-preview.component';

describe('ModalPreviewDropzoneFileComponent', () => {
  let component: DropzoneModalPreviewComponent;
  let fixture: ComponentFixture<DropzoneModalPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DropzoneModalPreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DropzoneModalPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
