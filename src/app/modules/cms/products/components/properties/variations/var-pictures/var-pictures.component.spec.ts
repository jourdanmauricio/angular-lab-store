import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VarPicturesComponent } from './var-pictures.component';

describe('VarPicturesComponent', () => {
  let component: VarPicturesComponent;
  let fixture: ComponentFixture<VarPicturesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VarPicturesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VarPicturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
