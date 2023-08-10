import {Directive, ElementRef, Input, OnInit, Renderer2} from '@angular/core';
import {ColorState, State} from '../utils/types';

/**
 * Attribute directive for a result of a question
 */
@Directive({
    selector: '[result]',
})
export class ResultDirective implements OnInit {
    /**
     * Indicates if element is selected
     */
    @Input() state: State = '';

    /**
     * Constructor of ResultDirective
     * @param _el ElementRef
     * @param _renderer Renderer2
     */
    constructor(private _el: ElementRef, private _renderer: Renderer2) {}

    /**
     * Triggered at initialization of the directive
     */
    ngOnInit(): void {
        if (!this.state) return;

        if (this.state) {
            const backgroundColor: ColorState = this.state === 'correct' ? 'green' : 'red';
            const color = 'white';
            this._setColorStyle(color, backgroundColor);
        }
    }

    /**
     * Sets color and background-color styles
     * @param color string
     * @param backgroundColor string
     */
    private _setColorStyle(color: ColorState, backgroundColor: ColorState): void {
        this._renderer.setStyle(this._el.nativeElement, 'color', color);
        this._renderer.setStyle(this._el.nativeElement, 'background-color', backgroundColor);
    }
}
