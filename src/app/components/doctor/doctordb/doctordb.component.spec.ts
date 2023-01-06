import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctordbComponent } from './doctordb.component';

describe('DoctordbComponent', () => {
  let component: DoctordbComponent;
  let fixture: ComponentFixture<DoctordbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctordbComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctordbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
