import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProductIntegrationsComponent } from './edit-product-integrations.component';

describe('EditProductIntegrationsComponent', () => {
  let component: EditProductIntegrationsComponent;
  let fixture: ComponentFixture<EditProductIntegrationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditProductIntegrationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditProductIntegrationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
