import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtNotificationComponent } from './at-notification.component';

describe('AtNotificationComponent', () => {
  let component: AtNotificationComponent;
  let fixture: ComponentFixture<AtNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtNotificationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AtNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
