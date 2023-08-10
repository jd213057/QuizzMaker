//import {Question} from '../entities/question';
import {UnescapePipe} from '../pipes/unescape';
import {SelectType} from '../types';
import {Choice} from './choice';

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

/**
 * Class the defines a Question object
 */
export class Question2 {
    /**
     *Unescape pipe to format questions and choices
     */
    protected static unescape: UnescapePipe = new UnescapePipe();

    /**
     * Number for Id registration
     */
    private static _idNumber = 0;

    /**
     * Id of Question
     */
    public id: number;

    /**
     * Question of Question
     */
    public question: string;

    /**
     * Correct answer of Question
     */
    public correctAnswer: string;

    /**
     * Incorrect answers of Question
     */
    public incorrectAnswers: string[];

    /**
     * Choices available for the question
     */
    public choices: Choice[];

    constructor(json: Question) {
        this.id = Question2._idNumber++;
        this.question = Question2.unescape.transform(json?.question);
        this.correctAnswer = Question2.unescape.transform(json?.correct_answer);
        this.incorrectAnswers = json?.incorrect_answers.map(el => Question2.unescape.transform(el));
        this.choices = Question2._getChoices(this.id, this.correctAnswer, this.incorrectAnswers);
    }

    /**
     * Returns shuffled list of choices for related question
     * @param question QuizQuestion
     * @returns List of choices string[]
     */
    private static _getChoices(id: number, correctAnswer: string, incorrectAnswers: string[]): Choice[] {
        let choices: Choice[] = [];
        choices.push(new Choice(id, correctAnswer, true, false));
        incorrectAnswers.forEach(el => choices.push(new Choice(id, el, false, false)));
        //Shuffles the list
        choices.sort(() => Math.random() - 0.5);
        return choices;
    }
}
