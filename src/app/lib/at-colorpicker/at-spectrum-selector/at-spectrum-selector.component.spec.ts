import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtSpectrumSelectorComponent } from './at-spectrum-selector.component';

describe('AtSpectrumSelectorComponent', () => {
  let component: AtSpectrumSelectorComponent;
  let fixture: ComponentFixture<AtSpectrumSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtSpectrumSelectorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AtSpectrumSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
