import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, tap} from 'rxjs';
import {CreateQuizResponse} from '../entities/createQuizResponse';
import {CreateQuizResponse as ICreateQuizResponse} from '../interfaces/createQuizResponse';
import {Question} from '../entities/question';
import {SelectOption} from '../entities/selectOption';
/**
 * Service responsible for maintaining data related to quiz functions
 */
@Injectable({
    providedIn: 'root',
})
export class QuizService {
    /**
     * Options available for the category of question of the quiz
     */
    public categoryOptions!: {
        trivia_categories: {
            id: number;
            name: string;
        }[];
    };

    /**
     * Options available for the level of difficulty of the quiz
     */
    private readonly _difficultyOptions: SelectOption[] = [
        new SelectOption('easy', 'Easy', false),
        new SelectOption('medium', 'Medium', false),
        new SelectOption('hard', 'Hard', false),
    ];

    /**
     * Indicates if has a quiz to display
     */
    private _hasQuiz: boolean = false;

    /**
     * Subject of the questions of the current quiz
     */
    public questionsSubject: BehaviorSubject<Question[]> = new BehaviorSubject<Question[]>([]);

    /**
     * Observable of the questions of the current quiz
     */
    public questions$: Observable<Question[]> = this.questionsSubject.asObservable();

    //Getters & Setters

    /**
     * Indicates if has a current quiz
     */
    public get hasQuiz(): boolean {
        return this._hasQuiz;
    }

    /**
     * Setter of _hasQuiz
     */
    public set hasQuiz(val: boolean) {
        this._hasQuiz = val;
    }

    /**
     * Gets the list of difficulty options
     */
    public get difficultyOptions(): SelectOption[] {
        return this._difficultyOptions;
    }

    constructor(private _http: HttpClient) {}

    /**
     * Initialize the quiz service
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
                        this.categoryOptions = content;
                        console.log('List of category options loaded');
                    } else {
                        console.error('There has been an error');
                    }
                })
            );
    }

    /**
     * Request creation of the quiz to the Trivia API
     */
    public createQuiz(quizSettings: {amount: number; category: number; difficulty: string; type: 'multiple' | 'any' | 'true/false'}) {
        const createQuizUrl = 'https://opentdb.com/api.php';
        return this._http.get<ICreateQuizResponse>(createQuizUrl, {params: quizSettings}).subscribe({
            next: data => {
                const createQuizResponse = new CreateQuizResponse(data);
                this.questionsSubject.next(createQuizResponse.questions);
                this._hasQuiz = true;
            },
            error: error => console.error(error),
            complete: () => console.log('Quiz creation completed.'),
        });
    }
}
