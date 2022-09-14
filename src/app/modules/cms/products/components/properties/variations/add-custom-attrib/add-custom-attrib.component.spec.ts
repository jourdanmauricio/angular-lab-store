import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCustomAttribComponent } from './add-custom-attrib.component';

describe('AddCustomAttribComponent', () => {
  let component: AddCustomAttribComponent;
  let fixture: ComponentFixture<AddCustomAttribComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCustomAttribComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCustomAttribComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
