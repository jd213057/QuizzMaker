import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Question} from '../../entities/question';
import {Answer} from '../../entities/answer';

@Component({
    selector: 'app-quizz-question',
    templateUrl: './quizz-question.component.html',
    styleUrls: ['./quizz-question.component.scss'],
})
export class QuizzQuestionComponent implements OnInit {
    /**
     * Question to be displayed
     */
    @Input() question!: Question;

    /**
     * Emitted when selection of choices changes
     */
    @Output() selectionChange: EventEmitter<Answer> = new EventEmitter<Answer>();

    /**
     * Choice of answers for the question
     * @type {string[]}
     */
    protected choices!: string[];

    /**
     *Selection of choices for the question asked
     * @type {string[]}
     */
    public selection: string[] = [];

    constructor() {}

    /**
     * Processes at the initialization of QuizzQuestionComponent
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
    protected onChoice(choice: string): void {
        const allreadySelected = this.selection.includes(choice);
        if (allreadySelected) {
            this.selection = this.selection.filter(el => el !== choice);
        } else {
            this.selection.push(choice);
        }
        this.selectionChange.emit(new Answer(this.question.id, this.selection));
    }
}
