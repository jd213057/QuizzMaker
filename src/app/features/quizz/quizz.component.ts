import {Component, ViewChildren} from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
import {QuizzQuestionComponent} from 'src/app/shared/components/quizz-question/quizz-question.component';
import {QuizzQuestion, SelectType} from 'src/app/shared/entities/quizzQuestion';
import {SelectOption} from 'src/app/shared/entities/selectOption';
import {QuizzService} from 'src/app/shared/services/quizz.service';
/**
 * Quizz HMI component
 */
@Component({
    selector: 'app-quizz',
    templateUrl: './quizz.component.html',
    styleUrls: ['./quizz.component.scss'],
})
export class QuizzComponent {
    /**
     *Form to set parameters for the quizz
     */
    protected quizzForm!: FormGroup;

    /**
     *Default category option
     */
    protected defaultCategoryOption = new SelectOption(0, 'Select a category', false);

    /**
     *Default category option
     */
    protected defaultDifficultyOption = new SelectOption(0, 'Select difficulty', false);

    /**
     * Questions
     * @type {QuizzQuestionComponent}
     */
    @ViewChildren('question') questionsEl?: QuizzQuestionComponent[];

    /**
     * List of answers of the current quizz
     * @type {{id: number, selection: string[]}[]}
     */
    protected answers: {id: number; selection: string[]; answered: boolean}[] = [];

    //Getters
    /**
     * Get the FormControl linked to category field
     */
    protected get category(): FormControl {
        return this.quizzForm.get('category') as FormControl;
    }

    /**
     * Get the FormControl linked to difficulty field
     */
    protected get difficulty(): FormControl {
        return this.quizzForm.get('difficulty') as FormControl;
    }

    /**
     * Gets the list of difficulty options
     * @type SelectOption
     */
    protected get difficultyOptions(): SelectOption[] {
        return this._quizzService.difficultyOptions;
    }

    /**
     * Gets the list of category options
     * @type {SelectOption[]}
     */
    protected get categoryOptions(): SelectOption[] {
        let categoryOptions: SelectOption[] = [];
        this._quizzService.categoryOptions.trivia_categories.forEach(opt =>
            categoryOptions.push(new SelectOption(opt.id, opt.name, false))
        );
        return categoryOptions;
    }

    /**
     * Gets the question of the current quizz
     */
    protected get hasQuizz() {
        return this._quizzService.hasQuizz;
    }

    /**
     * Gets the question of the current quizz
     */
    protected questions: QuizzQuestion[] = [];

    constructor(private _quizzService: QuizzService) {}

    /**
     * Process at the init of the component
     */
    ngOnInit() {
        this._initQuizzForm();
        this._quizzService.questions$.subscribe(questions => (this.questions = questions));
    }

    /**
     * Method to initialize the form
     */
    private _initQuizzForm() {
        this.quizzForm = new FormGroup({
            category: new FormControl(''),
            difficulty: new FormControl(''),
        });
    }

    /**
     * Creates a quizz from form data
     */
    protected createQuizz(): void {
        const quizzSettings = {
            amount: 5,
            category: +this.category.value,
            difficulty: this.difficulty.value,
            type: 'multiple' as SelectType,
        };
        this._quizzService.createQuizz(quizzSettings);
    }

    /**
     * Triggered when a choice is selected/deselected
     * @param value {id: number; selection: string[]}
     */
    protected onSelectionChange(value: {id: number; selection: string[]; answered: boolean}) {
        const alreadyAnswered = this.answers?.some(el => el.id === value.id);
        if (alreadyAnswered) {
            this.answers = this.answers.filter(el => el.id !== value.id);
        }
        this.answers.push(value);
    }

    /**
     * Indicates if quizz can be submited
     * @returns boolean
     */
    protected canSubmit(): boolean {
        if (!this.questionsEl) {
            return false;
        }

        const allQuestionsAnswered =
            this.questionsEl?.length > 0 &&
            this.answers?.length > 0 &&
            this.answers?.length === this.questionsEl?.length &&
            this.answers.every(el => el.answered);
        return !allQuestionsAnswered;
    }

    /**
     * Process at the destruction of the component
     */
    ngOnDestroy() {
        this._quizzService.questions$.unsubscribe();
    }
}
