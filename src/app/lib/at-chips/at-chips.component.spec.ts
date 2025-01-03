import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtChipsComponent } from './at-chips.component';

describe('AtChipsComponent', () => {
  let component: AtChipsComponent;
  let fixture: ComponentFixture<AtChipsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtChipsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AtChipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
