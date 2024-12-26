import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtColorpickerComponent } from './at-colorpicker.component';

describe('AtColorpickerComponent', () => {
  let component: AtColorpickerComponent;
  let fixture: ComponentFixture<AtColorpickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtColorpickerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AtColorpickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
