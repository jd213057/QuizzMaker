/**
 * Alias type for type of selecting answers
 */
export type SelectType = 'multiple' | 'any' | 'true/false';

/**
 * Interface to deserialize QuizzQuestion json like
 */
export interface QuizzQuestion {
    /**
     * Category of QuizzQuestion
     */
    category: string;

    /**
     * Difficulty of QuizzQuestion
     */
    difficulty: string;

    /**
     * Question of QuizzQuestion
     */
    question: string;

    /**
     * Type of QuizzQuestion
     */
    type: SelectType;

    /**
     * Correct answer of QuizzQuestion
     */
    correct_answer: string;

    /**
     * Incorrect answers of QuizzQuestion
     */
    incorrect_answers: string[];
}

/**
 * Class the defines a QuizzQuestion object
 */
export class QuizzQuestion {
    /**
     * Category of QuizzQuestion
     */
    public category: string;

    /**
     * Difficulty of QuizzQuestion
     */
    public difficulty: string;

    /**
     * Question of QuizzQuestion
     */
    public question: string;

    /**
     * Type of QuizzQuestion
     */
    public type: SelectType;

    /**
     * Correct answer of QuizzQuestion
     */
    public correctAnswer: string;

    /**
     * Incorrect answers of QuizzQuestion
     */
    public incorrectAnswers: string[];

    /**
     * Constructor of QuizzQuestion
     * @param json QuizzQuestion
     */
    constructor(json: QuizzQuestion) {
        this.category = json?.category;
        this.difficulty = json?.difficulty;
        this.question = json?.question;
        this.type = json?.type;
        this.correctAnswer = json?.correct_answer;
        this.incorrectAnswers = json?.incorrect_answers;
    }
}
