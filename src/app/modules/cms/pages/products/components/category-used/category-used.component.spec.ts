import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryUsedComponent } from './category-used.component';

describe('CategoryUsedComponent', () => {
  let component: CategoryUsedComponent;
  let fixture: ComponentFixture<CategoryUsedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryUsedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryUsedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
