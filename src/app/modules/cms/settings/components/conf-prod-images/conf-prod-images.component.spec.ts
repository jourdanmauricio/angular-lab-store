import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfProdImagesComponent } from './conf-prod-images.component';

describe('ConfProdImagesComponent', () => {
  let component: ConfProdImagesComponent;
  let fixture: ComponentFixture<ConfProdImagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfProdImagesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfProdImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
