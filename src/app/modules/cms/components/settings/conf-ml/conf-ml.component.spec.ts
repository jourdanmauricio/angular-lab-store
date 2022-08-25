import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfMlComponent } from './conf-ml.component';

describe('ConfMlComponent', () => {
  let component: ConfMlComponent;
  let fixture: ComponentFixture<ConfMlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfMlComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfMlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
