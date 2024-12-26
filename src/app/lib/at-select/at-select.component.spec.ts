import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtSelectComponent } from './at-select.component';

describe('AtSelectComponent', () => {
  let component: AtSelectComponent;
  let fixture: ComponentFixture<AtSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtSelectComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AtSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
