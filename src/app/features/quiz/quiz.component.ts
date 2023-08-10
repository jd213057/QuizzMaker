import {Component} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {Question} from 'src/app/shared/entities/question';
import {SelectOption} from 'src/app/shared/entities/selectOption';
import {QuizService} from 'src/app/shared/services/quiz.service';
import {SelectType} from 'src/app/shared/utils/types';
/**
 * Quiz HMI component
 */
@Component({
    selector: 'app-quiz',
    templateUrl: './quiz.component.html',
    styleUrls: ['./quiz.component.scss'],
})
export class QuizComponent {
    /**
     *Form to set parameters for the quiz
     */
    protected quizForm!: FormGroup;

    /**
     *Default category option
     */
    protected defaultCategoryOption = new SelectOption(0, 'Select a category', false);

    /**
     *Default category option
     */
    protected defaultDifficultyOption = new SelectOption(0, 'Select difficulty', false);

    /**
     * Gets the question of the current quiz
     */
    protected questions: Question[] = [];

    /**
     *Category of the quiz
     */
    protected category!: number;

    /**
     *Category of the quiz
     */
    protected difficulty: string = 'Select a difficulty';

    /**
     * List of category options
     */
    protected categoryOptions: SelectOption[] = [];

    /**
     * List of difficulty options
     */
    protected difficultyOptions: SelectOption[] = [];

    /**
     * Gets the question of the current quiz
     */
    protected get hasQuiz() {
        return this._quizService.hasQuiz;
    }

    constructor(private _quizService: QuizService, private _route: Router) {}

    /**
     * Process at the init of the component
     */
    ngOnInit() {
        this._initQuizForm();
        this._quizService.questions$.subscribe(questions => {
            this.questions = questions;
            // this._quizService.questionsSubject.unsubscribe();
        });
    }

    /**
     * Method to initialize the form
     */
    private _initQuizForm() {
        this.categoryOptions = this._quizService.categoryOptions.trivia_categories.map(opt => new SelectOption(opt.id, opt.name, false));
        this.category = +this.defaultCategoryOption.value;
        this.difficultyOptions = this._quizService.difficultyOptions;
        this.difficulty = this.defaultDifficultyOption.value.toString();
    }

    /**
     * Creates a quiz from form data
     */
    protected createQuiz(): void {
        const quizSettings = {
            amount: 5,
            category: +this.category,
            difficulty: this.difficulty,
            type: 'multiple' as SelectType,
        };
        this._quizService.createQuiz2(quizSettings);
    }

    /**
     * Indicates if quiz can be submited
     * @returns boolean
     */
    protected canSubmit(): boolean {
        return !this.questions.every(q => q.choices.some(c => c.selected));
    }

    /**
     * Triggered when quiz is submited
     */
    protected onSubmit() {
        console.log(this.questions);
        this._quizService.questionsSubject.next(this.questions);
        this._route.navigate(['/results']);
    }

    /**
     * Process at the destruction of the component
     */
    ngOnDestroy() {
        //this._quizService.questionsSubject.unsubscribe();
    }
}
