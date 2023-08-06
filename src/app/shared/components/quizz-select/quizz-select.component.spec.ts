import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizzSelectComponent } from './quizz-select.component';

describe('QuizzSelectComponent', () => {
  let component: QuizzSelectComponent;
  let fixture: ComponentFixture<QuizzSelectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuizzSelectComponent]
    });
    fixture = TestBed.createComponent(QuizzSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
