/**
 * Class that defines a SelectOption
 */
export class SelectOption {
    /**
     * Value of SelectOption
     */
    public value: number | string;

    /**
     * Label of SelectOption
     */
    public label: string;

    /**
     * Indicates if it is the selected value
     */
    public selected: boolean;

    /**
     * Constructor of SelectOption
     * @param value number | string
     * @param name string
     * @param selected boolean
     */
    constructor(value: number | string, name: string, selected: boolean) {
        this.value = value;
        this.label = name;
        this.selected = selected;
    }
}
