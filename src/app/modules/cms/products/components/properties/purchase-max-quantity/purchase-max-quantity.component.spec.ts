import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseMaxQuantityComponent } from './purchase-max-quantity.component';

describe('PurchaseMaxQuantityComponent', () => {
  let component: PurchaseMaxQuantityComponent;
  let fixture: ComponentFixture<PurchaseMaxQuantityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseMaxQuantityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchaseMaxQuantityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
