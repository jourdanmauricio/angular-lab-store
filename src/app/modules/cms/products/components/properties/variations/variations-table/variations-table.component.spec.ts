import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VariationsTableComponent } from './variations-table.component';

describe('VariationsTableComponent', () => {
  let component: VariationsTableComponent;
  let fixture: ComponentFixture<VariationsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VariationsTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VariationsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
