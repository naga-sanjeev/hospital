import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListofdoctorsComponent } from './listofdoctors.component';

describe('ListofdoctorsComponent', () => {
  let component: ListofdoctorsComponent;
  let fixture: ComponentFixture<ListofdoctorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListofdoctorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListofdoctorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
