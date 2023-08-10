import {Question as IQuestion} from '../interfaces/question';
import {UnescapePipe} from '../pipes/unescape';
import {Choice} from './choice';

/**
 * Class the defines a Question object
 */
export class Question {
    /**
     *Unescape pipe to format questions and choices
     */
    public static unescape: UnescapePipe = new UnescapePipe();

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
    public question!: string;

    /**
     * Correct answer of Question
     */
    public correctAnswer!: string;

    /**
     * Incorrect answers of Question
     */
    public incorrectAnswers!: string[];

    /**
     * Choices available for the question
     */
    public choices: Choice[];

    /**
     * Constructor of Question
     * @param json Question
     */
    constructor(json: IQuestion) {
        const noValue = '';
        const unescape: UnescapePipe = new UnescapePipe();

        this.id = Question._idNumber++;
        this.question = unescape.transform(json?.question) ?? noValue;
        this.correctAnswer = unescape.transform(json?.correct_answer) ?? noValue;
        this.incorrectAnswers = json?.incorrect_answers.map(el => unescape.transform(el) ?? noValue);
        this.choices = Question._getChoices(this.id, this.correctAnswer, this.incorrectAnswers);
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
