import {SelectType} from '../utils/types';

/**
 * Interface to deserialize Question json like
 */
export interface Question {
    /**
     * Category of Question
     */
    category: string;

    /**
     * Difficulty of Question
     */
    difficulty: string;

    /**
     * Question of Question
     */
    question: string;

    /**
     * Type of Question
     */
    type: SelectType;

    /**
     * Correct answer of Question
     */
    correct_answer: string;

    /**
     * Incorrect answers of Question
     */
    incorrect_answers: string[];
}
