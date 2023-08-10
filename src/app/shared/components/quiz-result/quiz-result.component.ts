import {Component, Input} from '@angular/core';
import {State as State} from '../../types';
import {Question2} from '../../entities/question';

@Component({
    selector: 'app-quiz-result',
    templateUrl: './quiz-result.component.html',
    styleUrls: ['./quiz-result.component.scss'],
})
export class QuizResultComponent {
    /**
     * Question answered of the current quiz
     */
    @Input() question!: Question2;

    constructor() {}

    /**
     * Gets the class to apply for question choice
     */
    protected getClass(selected: boolean, correct: boolean): State {
        let stateClass: State = '';

        if (!correct && selected) {
            stateClass = 'incorrect';
        } else if (correct) {
            stateClass = 'correct';
        }

        return stateClass;
    }
}
