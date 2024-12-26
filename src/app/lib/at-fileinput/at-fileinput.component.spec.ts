import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtFileinputComponent } from './at-fileinput.component';

describe('AtFileinputComponent', () => {
  let component: AtFileinputComponent;
  let fixture: ComponentFixture<AtFileinputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtFileinputComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AtFileinputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
