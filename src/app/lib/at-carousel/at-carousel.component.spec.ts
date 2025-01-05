import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtCarouselComponent } from './at-carousel.component';

describe('AtCarouselComponent', () => {
  let component: AtCarouselComponent;
  let fixture: ComponentFixture<AtCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtCarouselComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AtCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
