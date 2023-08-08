import {Question} from './question';

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
    results: Question[];
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
    public questions: Question[];

    /**
     * Constructor of CreateQuizzResponse
     * @param json
     */
    constructor(json: CreateQuizzResponse) {
        this.resultCode = json?.result_code;
        this.questions = json?.results.map(r => new Question(r));
    }
}
