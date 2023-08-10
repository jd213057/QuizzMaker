import {Component, Input, OnInit} from '@angular/core';
import {Choice} from '../../entities/choice';
import {Question as Question} from '../../entities/question';
import {Mode, State} from '../../utils/types';

@Component({
    selector: 'app-quiz-question',
    templateUrl: './quiz-question.component.html',
    styleUrls: ['./quiz-question.component.scss'],
})
export class QuizQuestionComponent implements OnInit {
    /**
     * Question to be displayed
     */
    @Input() question!: Question;

    /**
     * Question to be displayed
     */
    @Input() mode: Mode = 'quiz';

    /**
     * Choice of answers for the question
     */
    protected choices!: Choice[];

    /**
     *Selection of choices for the question asked
     */
    public selection: Choice[] = [];

    constructor() {}

    /**
     * Processes at the initialization of QuizQuestionComponent
     */
    ngOnInit() {
        if (this.question) {
            this.choices = this.question.choices;
        }
    }

    /**
     * Triggered when a choice is selected
     * @param choice string
     */
    protected onChoice(event: MouseEvent, choice: Choice): void {
        choice.selected = !choice.selected;
        event?.preventDefault();
    }

    /**
     * Indicates if display is in "quiz" mode
     * if false, then game is in "results" mode
     */
    protected isQuizMode(): boolean {
        return this.mode === 'quiz';
    }

    /**
     * Gets the class to apply for question choice
     */
    protected getState(choice: Choice): State {
        let state: State = '';

        if (!choice.correct && choice.selected) {
            state = 'incorrect';
        } else if (choice.correct) {
            state = 'correct';
        }

        return state;
    }
}
