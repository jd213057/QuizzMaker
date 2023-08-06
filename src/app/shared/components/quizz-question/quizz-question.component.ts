import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {QuizzQuestion} from '../../entities/quizzQuestion';

@Component({
    selector: 'app-quizz-question',
    templateUrl: './quizz-question.component.html',
    styleUrls: ['./quizz-question.component.scss'],
})
export class QuizzQuestionComponent implements OnInit {
    /**
     * Id of the question to be displayed
     */
    @Input() id!: number;
    /**
     * Question to be displayed
     */
    @Input() question!: QuizzQuestion;

    /**
     * Emitted when selection of choices changes
     */
    @Output() selectionChange: EventEmitter<{id: number; selection: string[]; answered: boolean}> = new EventEmitter<{
        id: number;
        selection: string[];
        answered: boolean;
    }>();

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
            this.choices = this._getChoices(this.question);
        }
    }

    /**
     * Returns shuffled list of choices for related question
     * @param question QuizzQuestion
     * @returns List of choices string[]
     */
    private _getChoices(question: QuizzQuestion): string[] {
        let choices = [question.correct_answer];
        choices.push(...question.incorrect_answers);
        //Shuffles the list
        choices.sort(() => Math.random() - 0.5);
        return choices;
    }

    /**
     * Triggered when a choice is selected
     * @param choice
     */
    protected onChoice(choice: string): void {
        console.log('onChoice');
        const allreadySelected = this.selection.includes(choice);
        if (allreadySelected) {
            this.selection = this.selection.filter(el => el !== choice);
        } else {
            this.selection.push(choice);
        }
        const hasAnswered = this.selection.length > 0;
        this.selectionChange.emit({id: this.id, selection: this.selection, answered: hasAnswered});
    }
}
