import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VariationsCombinationsComponent } from './variations-combinations.component';

describe('VariationsCombinationsComponent', () => {
  let component: VariationsCombinationsComponent;
  let fixture: ComponentFixture<VariationsCombinationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VariationsCombinationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VariationsCombinationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
