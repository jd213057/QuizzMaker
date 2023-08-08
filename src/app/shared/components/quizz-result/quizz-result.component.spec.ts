import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizzResultComponent } from './quizz-result.component';

describe('QuizzResultComponent', () => {
  let component: QuizzResultComponent;
  let fixture: ComponentFixture<QuizzResultComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuizzResultComponent]
    });
    fixture = TestBed.createComponent(QuizzResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
