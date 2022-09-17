import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VarAttributesComponent } from './var-attributes.component';

describe('VarAttributesComponent', () => {
  let component: VarAttributesComponent;
  let fixture: ComponentFixture<VarAttributesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VarAttributesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VarAttributesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
