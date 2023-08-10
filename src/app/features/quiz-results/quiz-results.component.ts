import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {Question} from 'src/app/shared/entities/question';
import {QuizService} from 'src/app/shared/services/quiz.service';
import {ColorState} from 'src/app/shared/utils/types';
/**
 * Results of the quiz (HMI component)
 */
@Component({
    selector: 'app-quiz-results',
    templateUrl: './quiz-results.component.html',
})
export class QuizResultsComponent implements OnInit, OnDestroy {
    /**
     * Results of the current quiz
     */
    public questions: Question[] = [];

    /**
     * Score obtained on the current quiz
     */
    public score: number = 0;

    /**
     * Score color of the score-bar
     */
    public scoreColor: ColorState = 'white';

    /**
     * Subscription for the question of the current quiz
     */
    private _questionsSubscription!: Subscription;

    /**
     * Constructor of QuizResultsComponent
     * @param _route ActivatedRoute
     */
    constructor(private _quizService: QuizService, private _route: Router) {}

    /**
     * Processes at the initialization of the component
     */
    ngOnInit() {
        this._questionsSubscription = this._quizService.questions$.subscribe({
            next: data => {
                if (data?.length > 0) {
                    this.questions = data;
                    this._setScore();
                }
            },
        });
    }

    /**
     * Calculates the final score of the current quiz
     */
    private _setScore(): void {
        this.questions.forEach(r => {
            const isCorrect = !r.choices.some(c => c.selected && !c.correct);
            if (isCorrect) {
                this.score += 1;
            }
        });
    }

    /**
     * Redirects to first page to start a new quiz
     */
    public navigateToQuiz(): void {
        this._quizService.hasQuiz = false;
        this._route.navigate(['/quiz']);
    }

    /**
     * Processes triggered at the destruction of QuizResultsComponent
     */
    ngOnDestroy(): void {
        this._questionsSubscription.unsubscribe();
    }
}
