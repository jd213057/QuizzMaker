/**
 * Class describing an answer
 */
export class Answer {
    /**
     * Id of the answer
     */
    public id: number;

    /**
     * Selection of choices
     */
    public selection: string[];

    /**
     * Constructor of Answer
     * @param id
     * @param selection
     */
    constructor(id: number, selection: string[]) {
        this.id = id;
        this.selection = selection;
    }
}
