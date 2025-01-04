import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyQRCodesComponent } from './my-qrcodes.component';

describe('MyQRCodesComponent', () => {
  let component: MyQRCodesComponent;
  let fixture: ComponentFixture<MyQRCodesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyQRCodesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyQRCodesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
