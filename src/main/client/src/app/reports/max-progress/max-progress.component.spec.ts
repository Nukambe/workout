import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaxProgressComponent } from './max-progress.component';

describe('MaxProgressComponent', () => {
  let component: MaxProgressComponent;
  let fixture: ComponentFixture<MaxProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaxProgressComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaxProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
