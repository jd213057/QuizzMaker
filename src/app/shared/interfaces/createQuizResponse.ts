import {Question} from './question';

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
