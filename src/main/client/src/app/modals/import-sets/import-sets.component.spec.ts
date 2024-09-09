import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportSetsComponent } from './import-sets.component';

describe('ImportSetsComponent', () => {
  let component: ImportSetsComponent;
  let fixture: ComponentFixture<ImportSetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImportSetsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImportSetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
