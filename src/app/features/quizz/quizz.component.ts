import {Component, ViewChildren} from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
import {Router} from '@angular/router';
import {QuizzQuestionComponent} from 'src/app/shared/components/quizz-question/quizz-question.component';
import {Answer} from 'src/app/shared/entities/answer';
import {Question} from 'src/app/shared/entities/question';
import {SelectType} from 'src/app/shared/types';
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
     * Gets the question of the current quizz
     */
    protected questions: Question[] = [];

    /**
     * List of answers of the current quizz
     * @type {{id: number, selection: string[]}[]}
     */
    protected answers: Answer[] = [];

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

    constructor(private _quizzService: QuizzService, private _route: Router) {}

    /**
     * Process at the init of the component
     */
    ngOnInit() {
        this._initQuizzForm();
        this._quizzService.questions$.subscribe(questions => (this.questions = questions));
        //this._quizzService.answers$.subscribe(answers => (this.answers = answers));
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
    protected onSelectionChange(value: Answer) {
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
            this.answers.every(el => el.selection?.length > 0);
        return !allQuestionsAnswered;
    }

    /**
     * Navigates to results page when quizz is completed
     */
    protected navigateToQuizzResults() {
        this._quizzService.answersSubject.next(this.answers);
        this._route.navigate(['/results']);
    }

    /**
     * Process at the destruction of the component
     */
    ngOnDestroy() {
        //this._quizzService.questionsSubject.unsubscribe();
    }
}
