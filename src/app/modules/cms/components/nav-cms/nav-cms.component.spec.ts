import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavCmsComponent } from './nav-cms.component';

describe('NavCmsComponent', () => {
  let component: NavCmsComponent;
  let fixture: ComponentFixture<NavCmsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavCmsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavCmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
