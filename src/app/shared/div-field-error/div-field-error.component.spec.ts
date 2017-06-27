import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DivFieldErrorComponent } from './div-field-error.component';

describe('DivFieldErrorComponent', () => {
  let component: DivFieldErrorComponent;
  let fixture: ComponentFixture<DivFieldErrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DivFieldErrorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DivFieldErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
