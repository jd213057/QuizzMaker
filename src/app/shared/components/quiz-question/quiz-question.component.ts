import {Component, Input, OnInit} from '@angular/core';
import {Choice} from '../../entities/choice';
import {Question2} from '../../entities/question';

@Component({
    selector: 'app-quiz-question',
    templateUrl: './quiz-question.component.html',
    styleUrls: ['./quiz-question.component.scss'],
})
export class QuizQuestionComponent implements OnInit {
    /**
     * Question to be displayed
     */
    @Input() question!: Question2;

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
    protected onChoice(choice: Choice): void {
        choice.selected = !choice.selected;
    }
}
