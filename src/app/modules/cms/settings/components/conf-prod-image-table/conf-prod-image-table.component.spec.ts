import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfProdImageTableComponent } from './conf-prod-image-table.component';

describe('ConfProdImageTableComponent', () => {
  let component: ConfProdImageTableComponent;
  let fixture: ComponentFixture<ConfProdImageTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfProdImageTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfProdImageTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
