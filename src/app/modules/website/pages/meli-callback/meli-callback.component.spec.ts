import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeliCallbackComponent } from './meli-callback.component';

describe('MeliCallbackComponent', () => {
  let component: MeliCallbackComponent;
  let fixture: ComponentFixture<MeliCallbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeliCallbackComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeliCallbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
