import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProductLocalComponent } from './edit-product-local.component';

describe('EditProductLocalComponent', () => {
  let component: EditProductLocalComponent;
  let fixture: ComponentFixture<EditProductLocalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditProductLocalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditProductLocalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
