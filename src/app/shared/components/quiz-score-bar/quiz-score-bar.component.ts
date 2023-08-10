import {Component, Input, OnInit} from '@angular/core';
import {ColorState} from '../../utils/types';
/**
 * Class that describes QuizScoreBarComponent
 */
@Component({
    selector: 'app-quiz-score-bar',
    templateUrl: './quiz-score-bar.component.html',
})
export class QuizScoreBarComponent implements OnInit {
    /**
     * Score for the current quiz
     */
    @Input() score!: number;

    /**
     * Number of questions for the current quiz
     */
    @Input() nbQuestions!: number;

    /**
     * Background color to display
     */
    public scoreColor: ColorState = 'white';

    constructor() {}

    /**
     * Triggered when component is initialized
     */
    ngOnInit(): void {
        this._setScoreColor();
    }

    /**
     * Sets color style for the score-bar
     */
    private _setScoreColor(): void {
        if (!this.nbQuestions) {
            return;
        }

        const lowScore = 0.2;
        const highScore = 0.8;

        const scorePercent = this.score / this.nbQuestions;

        if (scorePercent >= highScore) {
            this.scoreColor = 'green';
        } else if (scorePercent < highScore && scorePercent > lowScore) {
            this.scoreColor = 'yellow';
        } else {
            this.scoreColor = 'red';
        }
    }
}
