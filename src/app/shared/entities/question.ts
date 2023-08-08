import {SelectType} from '../types';

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
export class Question {
    /**
     * Number for Id registration
     */
    private static _idNumber = 0;

    /**
     * Id of Question
     */
    public readonly id!: number;

    /**
     * Category of Question
     */
    public category: string;

    /**
     * Difficulty of Question
     */
    public difficulty: string;

    /**
     * Question of Question
     */
    public question: string;

    /**
     * Type of Question
     */
    public type: SelectType;

    /**
     * Correct answer of Question
     */
    public correctAnswer: string;

    /**
     * Incorrect answers of Question
     */
    public incorrectAnswers: string[];

    /**
     * Choices of Question
     */
    public choices: string[];

    /**
     * Constructor of Question
     * @param json Question
     */
    constructor(json: Question) {
        this.id = Question._idNumber++;
        this.category = json?.category;
        this.difficulty = json?.difficulty;
        this.question = json?.question;
        this.type = json?.type;
        this.correctAnswer = json?.correct_answer;
        this.incorrectAnswers = json?.incorrect_answers;
        this.choices = Question._getChoices(this.correctAnswer, this.incorrectAnswers);
    }

    /**
     * Returns shuffled list of choices for related question
     * @param question QuizzQuestion
     * @returns List of choices string[]
     */
    private static _getChoices(correctAnswer: string, incorrectAnswers: string[]): string[] {
        let choices = [correctAnswer];
        choices.push(...incorrectAnswers);
        //Shuffles the list
        choices.sort(() => Math.random() - 0.5);
        return choices;
    }
}
export {SelectType};
