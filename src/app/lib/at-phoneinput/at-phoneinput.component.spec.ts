import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtPhoneinputComponent } from './at-phoneinput.component';

describe('AtPhoneinputComponent', () => {
  let component: AtPhoneinputComponent;
  let fixture: ComponentFixture<AtPhoneinputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtPhoneinputComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AtPhoneinputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
