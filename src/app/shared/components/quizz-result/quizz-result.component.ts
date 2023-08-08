import {Component, Input} from '@angular/core';
import {State as State} from '../../types';

@Component({
    selector: 'app-quizz-result',
    templateUrl: './quizz-result.component.html',
    styleUrls: ['./quizz-result.component.scss'],
})
export class QuizzResultComponent {
    /**
     * Result of a question quizz
     * @type {({id: number; question: string; choices: {value: string; answered: boolean | undefined; correct: boolean}[]})}
     */
    @Input() result!: {id: number; question: string; choices: {value: string; answered: boolean | undefined; correct: boolean}[]};

    constructor() {}

    /**
     * Gets the class to apply for question choice
     */
    protected getClass(answered: boolean | undefined, correct: boolean): State {
        let stateClass: State = '';

        if (!correct && answered) {
            stateClass = 'incorrect';
        } else if (correct) {
            stateClass = 'correct';
        }

        console.log(stateClass);
        return stateClass;
    }
}
