import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {combineLatest, combineLatestWith} from 'rxjs';
import {Answer} from 'src/app/shared/entities/answer';
import {Question} from 'src/app/shared/entities/question';
import {QuizzService} from 'src/app/shared/services/quizz.service';
import {ColorState} from 'src/app/shared/types';
/**
 * Results of the quizz HMI component
 */
@Component({
    selector: 'app-quizz-results',
    templateUrl: './quizz-results.component.html',
    styleUrls: ['./quizz-results.component.scss'],
})
export class QuizzResultsComponent implements OnInit, OnDestroy {
    /**
     * Results of the current quizz
     */
    protected results: {id: number; question: string; choices: {value: string; answered: boolean | undefined; correct: boolean}[]}[] = [];

    /**
     * Score obtained on the current quizz
     */
    protected score: number = 0;

    /**
     * Score color of the score-bar
     */
    protected scoreColor: ColorState = 'white';

    /**
     * Constructor of QuizzResultsComponent
     * @param _route ActivatedRoute
     */
    constructor(private _quizzService: QuizzService, private _route: Router) {}

    /**
     * Processes at the initialization of the component
     */
    ngOnInit() {
        combineLatest([this._quizzService.questions$, this._quizzService.answers$]).subscribe({
            next: ([questions, answers]) => {
                const hasResults = questions?.length > 0 && answers?.length > 0;
                if (hasResults) {
                    this._setResults(questions, answers);
                    this._setScore();
                    this._setScoreColor();
                }
            },
            error: err => console.error(err),
            complete: () => {},
        });
    }

    /**
     * Get results of the current quizz
     * @param questions
     * @param answers
     */
    private _setResults(questions: Question[], answers: Answer[]) {
        questions.forEach(q => {
            let choices: {value: string; answered: boolean | undefined; correct: boolean}[] = [];
            const answer = answers.find(a => a.id === q.id)?.selection;
            let answered = false;
            q.choices.forEach(c => {
                if (answer?.length) {
                    answered = answer?.length > 0 && answer.includes(c);
                }
                const correct = q.correctAnswer === c;
                const choice = {
                    value: c,
                    answered: answered,
                    correct: correct,
                };
                choices.push(choice);
            });
            const result = {
                id: q.id,
                question: q.question,
                choices: choices,
            };
            this.results.push(result);
        });
        console.log(this.results);
    }

    /**
     * Calculates the final score of the current quizz
     */
    private _setScore(): void {
        this.results.forEach(r => {
            const isCorrect = !r.choices.some(c => c.answered && !c.correct);
            if (isCorrect) {
                this.score += 1;
            }
        });
    }

    /**
     * Sets color style for the score-bar
     */
    private _setScoreColor(): void {
        const lowScore = 0.2;
        const highScore = 0.8;

        if (!this.results?.length) {
            return;
        }

        const scorePercent = this.score / this.results.length;

        if (scorePercent >= highScore) {
            this.scoreColor = 'green';
        } else if (scorePercent < highScore && scorePercent > lowScore) {
            this.scoreColor = 'yellow';
        } else {
            this.scoreColor = 'red';
        }
    }

    /**
     * Redirects to first page to start a new quizz
     */
    protected navigateToQuizz() {
        this._quizzService.hasQuizz = false;
        //this._quizzService.answersSubject.unsubscribe();
        //this._quizzService.questionsSubject.unsubscribe();
        this._route.navigate(['/quizz']);
    }

    /**
     * Processes triggered at the destruction of QuizzResultsComponent
     */
    ngOnDestroy() {
        //this._quizzService.answersSubject.unsubscribe();
    }
}
