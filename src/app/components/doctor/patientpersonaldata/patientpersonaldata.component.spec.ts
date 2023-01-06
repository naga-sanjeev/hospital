import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientpersonaldataComponent } from './patientpersonaldata.component';

describe('PatientpersonaldataComponent', () => {
  let component: PatientpersonaldataComponent;
  let fixture: ComponentFixture<PatientpersonaldataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientpersonaldataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientpersonaldataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
