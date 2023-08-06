import {QuizzQuestion} from './quizzQuestion';

/**
 * Interface to deserialize CreateQuizzResponse json like
 */
export interface CreateQuizzResponse {
    /**
     * Result code of CreateQuizzResponse
     */
    result_code: number;

    /**
     * Results of CreateQuizzResponse
     */
    results: QuizzQuestion[];
}

/**
 * Class that defines a CreateQuizzResponse object
 */
export class CreateQuizzResponse {
    /**
     * Result code of CreateQuizzResponse
     */
    public resultCode: number;

    /**
     * Questions of CreateQuizzResponse
     */
    public questions: QuizzQuestion[];

    /**
     * Constructor of CreateQuizzResponse
     * @param json
     */
    constructor(json: CreateQuizzResponse) {
        this.resultCode = json?.result_code;
        this.questions = json?.results;
        //this.questions = json?.results.map(r => new QuizzQuestion(r));
    }
}
