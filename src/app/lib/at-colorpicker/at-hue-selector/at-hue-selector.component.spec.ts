import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtHueSelectorComponent } from './at-hue-selector.component';

describe('AtHueSelectorComponent', () => {
  let component: AtHueSelectorComponent;
  let fixture: ComponentFixture<AtHueSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtHueSelectorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AtHueSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
