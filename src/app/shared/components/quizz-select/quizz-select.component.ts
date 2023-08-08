import {Component, EventEmitter, Input, OnInit, Output, forwardRef} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {SelectOption} from '../../entities/selectOption';

/**
 * Dropdown component
 * @export
 * @class QuizzSelectComponent
 */
@Component({
    selector: 'app-quizz-select',
    templateUrl: './quizz-select.component.html',
    styleUrls: ['./quizz-select.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => QuizzSelectComponent),
            multi: true,
        },
    ],
})
export class QuizzSelectComponent implements OnInit, ControlValueAccessor {
    /**
     * Title of the dropdown component
     * @type {string}
     */
    @Input() title: string = '';

    /**
     * Select Id of the dropdown component
     * @type {string}
     */
    @Input() selectId: string = '';

    /**
     * Name of the dropdown component
     * @type {string}
     */
    @Input() name: string = '';

    /**
     * Selected option  of the dropdown component
     * @type {string}
     */
    @Input() optionSelected!: SelectOption;

    /**
     * Default option  of the dropdown component
     * @type {string}
     */
    @Input() defaultOption: SelectOption = new SelectOption(0, 'Select an item', !this.optionSelected);
    /**
     * Options provided for the dropdown component
     * @type {string}
     */
    @Input() options: SelectOption[] = [];

    /**
     * Options available for the dropdown component
     * @type {string}
     * @memberof QuizzSelectComponent
     */
    /*optionsFormated: {value: number | string; name: string; selected: boolean; disabled?: boolean; hidden?: boolean}[] = [];*/

    /**
     * Options available for the dropdown component
     * @type {string}
     * @memberof QuizzSelectComponent
     */
    @Output() selectChange: EventEmitter<{value: number | string; name: string}[]> = new EventEmitter();

    constructor() {}

    writeValue(value: number | string): void {
        console.log(value);
        //if (this.optionSelected?.value) this.optionSelected.value = value ?? 0;
    }
    onChange: Function = () => {};
    onTouched: Function = () => {};

    registerOnChange(fn: Function) {
        this.onChange = fn;
    }

    registerOnTouched(fn: Function) {
        this.onTouched = fn;
    }

    setDisabledState?(isDisabled: boolean): void {}

    /**
     * Triggered when select has changes
     * @param e
     */
    protected onSelectChange(e: any) {
        this.optionSelected = {value: e.target.value, label: e.target.value, selected: true};
        this.onChange(e.target.value);
    }

    //Processes at the initialization of the component
    ngOnInit(): void {
        /*const defaultOption = {value: 0, name: 'Select an item', selected: !this.optionSelected};
        const hasValidDefaultOption = this.defaultOption?.value && this.defaultOption?.name;
        this.optionsFormated = [...this.options];
        this.optionsFormated.unshift(hasValidDefaultOption ? this.defaultOption : defaultOption);*/
        // console.log(this.options);
    }

    /**
     * Checks if option is selected
     * @param val number | string
     * @return {boolean}
     */
    protected isSelected(val: number | string): boolean {
        return val == this.optionSelected?.value;
    }
}
