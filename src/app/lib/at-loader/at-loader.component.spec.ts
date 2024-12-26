import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtLoaderComponent } from './at-loader.component';

describe('AtLoaderComponent', () => {
  let component: AtLoaderComponent;
  let fixture: ComponentFixture<AtLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtLoaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AtLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
