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
     * Indicates if it is a disabled SelectOption
     */
    public disabled?: boolean;

    /**
     * Indicates if ti is a hidden SelectOption
     */
    public hidden?: boolean;

    /**
     * Constructor of SelectOption
     * @param value number | string
     * @param name string
     * @param selected boolean
     * @param disabled boolean
     * @param hidden boolean
     */
    constructor(value: number | string, name: string, selected: boolean, disabled?: boolean, hidden?: boolean) {
        this.value = value;
        this.label = name;
        this.selected = selected;
        this.disabled = disabled;
        this.hidden = hidden;
    }
}
