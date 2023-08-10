import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {Question} from '../../shared/entities/question';
import {SelectOption} from '../../shared/entities/selectOption';
import {QuizService} from '../../shared/services/quiz.service';
import {SelectType} from '../../shared/utils/types';
/**
 * Quiz HMI component
 */
@Component({
    selector: 'app-quiz',
    templateUrl: './quiz.component.html',
})
export class QuizComponent implements OnInit, OnDestroy {
    /**
     *Form to set parameters for the quiz
     */
    public quizForm!: FormGroup;

    /**
     *Default category option
     */
    public defaultCategoryOption = new SelectOption(0, 'Select a category', false);

    /**
     *Default category option
     */
    public defaultDifficultyOption = new SelectOption(0, 'Select difficulty', false);

    /**
     * Gets the question of the current quiz
     */
    public questions: Question[] = [];

    /**
     *Category of the quiz
     */
    public category!: number;

    /**
     *Category of the quiz
     */
    public difficulty: string = 'Select a difficulty';

    /**
     * List of category options
     */
    public categoryOptions: SelectOption[] = [];

    /**
     * List of difficulty options
     */
    public difficultyOptions: SelectOption[] = [];

    /**
     * Gets the question of the current quiz
     */
    public get hasQuiz() {
        return this._quizService.hasQuiz;
    }

    /**
     * Subscription for the question of the current quiz
     */
    private _questionsSubscription!: Subscription;

    constructor(private _quizService: QuizService, private _route: Router) {}

    /**
     * Process at the init of the component
     */
    ngOnInit() {
        this._initQuizForm();
        this._questionsSubscription = this._quizService.questions$.subscribe(questions => {
            this.questions = questions;
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
    public createQuiz(): void {
        const quizSettings = {
            amount: 5,
            category: +this.category,
            difficulty: this.difficulty,
            type: 'multiple' as SelectType,
        };
        this._quizService.createQuiz(quizSettings);
    }

    /**
     * Indicates if quiz can be submited
     * @returns boolean
     */
    public canSubmit(): boolean {
        return !this.questions.every(q => q.choices.some(c => c.selected));
    }

    /**
     * Triggered when quiz is submited
     */
    public onSubmit() {
        this._quizService.questionsSubject.next(this.questions);
        this._route.navigate(['/results']);
    }

    /**
     * Process at the destruction of the component
     */
    ngOnDestroy() {
        this._questionsSubscription.unsubscribe();
    }
}
