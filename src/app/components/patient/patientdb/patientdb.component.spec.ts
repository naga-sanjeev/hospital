import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientdbComponent } from './patientdb.component';

describe('PatientdbComponent', () => {
  let component: PatientdbComponent;
  let fixture: ComponentFixture<PatientdbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientdbComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientdbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
