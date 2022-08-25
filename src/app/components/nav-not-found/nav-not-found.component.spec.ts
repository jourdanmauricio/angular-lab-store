import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavNotFoundComponent } from './nav-not-found.component';

describe('NavNotFoundComponent', () => {
  let component: NavNotFoundComponent;
  let fixture: ComponentFixture<NavNotFoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavNotFoundComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
