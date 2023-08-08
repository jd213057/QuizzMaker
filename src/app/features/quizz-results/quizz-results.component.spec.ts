import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizzResultsComponent } from './quizz-results.component';

describe('QuizzResultsComponent', () => {
  let component: QuizzResultsComponent;
  let fixture: ComponentFixture<QuizzResultsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuizzResultsComponent]
    });
    fixture = TestBed.createComponent(QuizzResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
