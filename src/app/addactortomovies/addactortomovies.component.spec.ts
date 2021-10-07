import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddactortomoviesComponent } from './addactortomovies.component';

describe('AddactortomoviesComponent', () => {
  let component: AddactortomoviesComponent;
  let fixture: ComponentFixture<AddactortomoviesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddactortomoviesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddactortomoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
