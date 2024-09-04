import {ComponentFixture, TestBed} from '@angular/core/testing';

import {WorkoutButtonComponent} from './workout-button.component';

describe('WorkoutButtonComponent', () => {
  let component: WorkoutButtonComponent;
  let fixture: ComponentFixture<WorkoutButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkoutButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkoutButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
