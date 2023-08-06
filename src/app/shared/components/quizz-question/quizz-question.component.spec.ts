import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizzQuestionComponent } from './quizz-question.component';

describe('QuizzQuestionComponent', () => {
  let component: QuizzQuestionComponent;
  let fixture: ComponentFixture<QuizzQuestionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuizzQuestionComponent]
    });
    fixture = TestBed.createComponent(QuizzQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
