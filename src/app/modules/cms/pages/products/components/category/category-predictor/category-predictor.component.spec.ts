import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryPredictorComponent } from './category-predictor.component';

describe('CategoryPredictorComponent', () => {
  let component: CategoryPredictorComponent;
  let fixture: ComponentFixture<CategoryPredictorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryPredictorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryPredictorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
