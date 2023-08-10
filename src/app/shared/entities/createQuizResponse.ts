import {Question} from './question';
import {CreateQuizResponse as ICreateQuizResponse} from '../interfaces/createQuizResponse';

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
    public questions: Question[];

    /**
     * Constructor of CreateQuizResponse
     * @param json CreateQuizResponse
     */
    constructor(json: ICreateQuizResponse) {
        this.resultCode = json?.result_code;
        this.questions = json?.results.map(r => new Question(r));
    }
}
