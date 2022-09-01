import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfProdComponent } from './conf-prod.component';

describe('ConfProdComponent', () => {
  let component: ConfProdComponent;
  let fixture: ComponentFixture<ConfProdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfProdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfProdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
