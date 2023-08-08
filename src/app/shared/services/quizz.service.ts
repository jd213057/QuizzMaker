import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject, tap} from 'rxjs';
import {Answer} from '../entities/answer';
import {CreateQuizzResponse} from '../entities/createQuizzResponse';
import {Question} from '../entities/question';
import {SelectOption} from '../entities/selectOption';

@Injectable({
    providedIn: 'root',
})
export class QuizzService {
    /**
     * Options available for the category of question of the quizz
     * @protected
     * @type {({trivia_categories: {id: number; name: string}}[])}
     */
    protected _categoryOptions!: {
        trivia_categories: {
            id: number;
            name: string;
        }[];
    };
    /**
     * Options available for the level of difficulty of the quizz
     * @protected
     * @type {(SelectOption[])}
     */
    private readonly _difficultyOptions: SelectOption[] = [
        new SelectOption('easy', 'Easy', false),
        new SelectOption('medium', 'Medium', false),
        new SelectOption('high', 'High', false),
    ];

    /**
     * Questions of the current quizz
     * @type {(Question[])}
     */
    private _questions: Question[] = [];

    /**
     * Indicates if has a quizz to display
     * @type {boolean}
     */
    private _hasQuizz: boolean = false;

    /**
     * Subject of the questions of the current quizz
     * @readonly
     * @type {(Question[])}
     */
    public questionsSubject: BehaviorSubject<Question[]> = new BehaviorSubject<Question[]>([]);

    /**
     * Observable of the questions of the current quizz
     * @readonly
     * @type {(Question[])}
     */
    public questions$: Observable<Question[]> = this.questionsSubject.asObservable();

    /**
     * Subject of the answers of the current quizz
     * @readonly
     * @type {(Answer[])}
     */
    public answersSubject: BehaviorSubject<Answer[]> = new BehaviorSubject<Answer[]>([]);

    /**
     * Observable of the questions of the current quizz
     * @readonly
     * @type {(Answer[])}
     */
    public answers$: Observable<Answer[]> = this.answersSubject.asObservable();

    /**
     * Indicates if has a current quizz
     * @readonly
     * @type {(Question[])}
     */
    public get hasQuizz(): boolean {
        return this._hasQuizz;
    }

    /**
     * Setter of _hasQuizz
     * @type {void}
     */
    public set hasQuizz(val: boolean) {
        this._hasQuizz = val;
    }

    /**
     * Gets the list of difficulty options
     * @readonly
     * @type {(SelectOption[])}
     */
    public get difficultyOptions(): SelectOption[] {
        return this._difficultyOptions;
    }

    /**
     * Gets the list of difficulty options
     * @readonly
     * @type {(SelectOption[])}
     */
    public get categoryOptions(): {
        trivia_categories: {
            id: number;
            name: string;
        }[];
    } {
        return this._categoryOptions;
    }

    constructor(private _http: HttpClient) {}

    /**
     * Initialize the quizz service
     * Request from API the list of category options
     */
    public initService(): Observable<{
        trivia_categories: {
            id: number;
            name: string;
        }[];
    }> {
        const categoryUrl = 'https://opentdb.com/api_category.php';
        return this._http
            .get<{
                trivia_categories: {
                    id: number;
                    name: string;
                }[];
            }>(categoryUrl)
            .pipe(
                tap(content => {
                    if (content) {
                        this._categoryOptions = content;
                        console.log('List of category options loaded');
                    } else {
                        console.error('There has been an error');
                    }
                })
            );
    }

    /**
     * Request creation of the quizz to the Trivia API
     */
    public createQuizz(quizzSettings: {amount: number; category: number; difficulty: string; type: 'multiple' | 'any' | 'true/false'}) {
        const createQuizzUrl = 'https://opentdb.com/api.php';
        return this._http.get<CreateQuizzResponse>(createQuizzUrl, {params: quizzSettings}).subscribe({
            next: data => {
                const createQuizzResponse = new CreateQuizzResponse(data);
                this.questionsSubject.next(createQuizzResponse.questions);
                this._hasQuizz = true;
            },
            error: error => console.error(error),
            complete: () => console.log('Quizz creation completed.'),
        });
    }
}
