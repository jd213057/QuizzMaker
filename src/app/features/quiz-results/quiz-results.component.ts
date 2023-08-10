import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Question2} from 'src/app/shared/entities/question';
import {QuizService} from 'src/app/shared/services/quiz.service';
import {ColorState} from 'src/app/shared/types';
/**
 * Results of the quiz (HMI component)
 */
@Component({
    selector: 'app-quiz-results',
    templateUrl: './quiz-results.component.html',
    styleUrls: ['./quiz-results.component.scss'],
})
export class QuizResultsComponent implements OnInit, OnDestroy {
    /**
     * Results of the current quiz
     */
    protected questions: Question2[] = [];

    /**
     * Score obtained on the current quiz
     */
    protected score: number = 0;

    /**
     * Score color of the score-bar
     */
    protected scoreColor: ColorState = 'white';

    /**
     * Constructor of QuizResultsComponent
     * @param _route ActivatedRoute
     */
    constructor(private _quizService: QuizService, private _route: Router) {}

    /**
     * Processes at the initialization of the component
     */
    ngOnInit() {
        this._quizService.questions$.subscribe({
            next: data => {
                if (data?.length > 0) {
                    this.questions = data;
                    //this._setResults(data);
                    this._setScore();
                    this._setScoreColor();
                }
            },
        });
    }

    /**
     * Get results of the current quiz
     * @param questions
     * @param answers
     */
    /*private _setResults(questions: Question[], answers: Answer[]) {
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
    }*/

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
     * Sets color style for the score-bar
     */
    private _setScoreColor(): void {
        const lowScore = 0.2;
        const highScore = 0.8;

        if (!this.questions?.length) {
            return;
        }

        const scorePercent = this.score / this.questions.length;

        if (scorePercent >= highScore) {
            this.scoreColor = 'green';
        } else if (scorePercent < highScore && scorePercent > lowScore) {
            this.scoreColor = 'yellow';
        } else {
            this.scoreColor = 'red';
        }
    }

    /**
     * Redirects to first page to start a new quiz
     */
    protected navigateToQuiz() {
        this._quizService.hasQuiz = false;
        //this._quizService.answersSubject.unsubscribe();
        //this._quizService.questionsSubject.unsubscribe();
        this._route.navigate(['/quiz']);
    }

    /**
     * Processes triggered at the destruction of QuizResultsComponent
     */
    ngOnDestroy() {
        //this._quizService.answersSubject.unsubscribe();
    }
}
