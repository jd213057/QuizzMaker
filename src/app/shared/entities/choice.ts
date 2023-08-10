/**
 * Defines a class that describes a choice
 */
export class Choice {
    /**
     * Id of Choice
     */
    public id: number;

    /**
     * Value of Choice
     */
    public value: string;

    /**
     * Indicates if it is the correct choice
     */
    public correct: boolean;

    /**
     * Indicates if choice is selected
     */
    public selected: boolean;

    /**
     * Constrcutor of Choice
     * @param id number
     * @param value string
     * @param correct boolean
     * @param selected boolean
     */
    constructor(id: number, value: string, correct: boolean, selected: boolean) {
        this.id = id;
        this.value = value;
        this.correct = correct;
        this.selected = selected;
    }
}
