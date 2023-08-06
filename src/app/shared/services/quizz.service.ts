import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, Subject, tap} from 'rxjs';
import {CreateQuizzResponse} from '../entities/createQuizzResponse';
import {QuizzQuestion} from '../entities/quizzQuestion';
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
        new SelectOption('medium', 'medium', false),
        new SelectOption('high', 'High', false),
    ];

    /**
     * Questions of the current quizz
     * @type {(QuizzQuestion[])}
     */
    private _questions: QuizzQuestion[] = [];

    /**
     * Indicates if has a quizz to display
     * @type {boolean}
     */
    private _hasQuizz: boolean = false;

    /**
     * Subject of the questions of the current quizz
     * @readonly
     * @type {(QuizzQuestion[])}
     */
    public questions$: Subject<QuizzQuestion[]> = new Subject<QuizzQuestion[]>();

    /**
     * Indicates if has a current quizz
     * @readonly
     * @type {(QuizzQuestion[])}
     */
    public get hasQuizz(): boolean {
        return this._hasQuizz;
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
            ); /*subscribe({
          next: data => {
              console.log(data);
              this._categoryOptions = data;
          },
          error: error => console.error('There has been an error :' + error),
          complete: () => console.log('Category list downloaded'),
      });*/
    }

    /**
     * Request creation of the quizz to the Trivia API
     */
    public createQuizz(quizzSettings: {amount: number; category: number; difficulty: string; type: 'multiple' | 'any' | 'true/false'}) {
        const createQuizzUrl = 'https://opentdb.com/api.php';
        return this._http.get<CreateQuizzResponse>(createQuizzUrl, {params: quizzSettings}).subscribe({
            next: data => {
                console.log(data);
                const createQuizzResponse = new CreateQuizzResponse(data);
                this.questions$.next(createQuizzResponse.questions);
                this._hasQuizz = true;
            },
            error: error => console.error(error),
            complete: () => console.log('Quizz creation completed.'),
        });
    }
}
