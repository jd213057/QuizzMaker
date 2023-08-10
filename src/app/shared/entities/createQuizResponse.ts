import {Question} from './question';
import {Question2} from './question';

/**
 * Interface to deserialize CreateQuizResponse json like
 */
export interface CreateQuizResponse {
    /**
     * Result code of CreateQuizResponse
     */
    result_code: number;

    /**
     * Results of CreateQuizResponse
     */
    results: Question[];
}

/**
 * Class that defines a CreateQuizResponse object
 */
export class CreateQuizResponse {
    /**
     * Result code of CreateQuizResponse
     */
    public resultCode: number;

    /**
     * Questions of CreateQuizResponse
     */
    //public questions: Question[];
    public questions: Question2[];

    /**
     * Constructor of CreateQuizResponse
     * @param json
     */
    constructor(json: CreateQuizResponse) {
        this.resultCode = json?.result_code;
        this.questions = json?.results.map(r => new Question2(r));
        // this.questions = json?.results.map(r => new Question(r));
    }
}
