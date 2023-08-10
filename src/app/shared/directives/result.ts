import {Directive, ElementRef, Input, OnChanges, Renderer2} from '@angular/core';
import {ColorState, State} from '../utils/types';

/**
 * Attribute directive for a result of a question
 */
@Directive({
    selector: '[result]',
})
export class ResultDirective implements OnChanges {
    /**
     * Indicates if element is selected
     */
    @Input() state: State = '';

    constructor(private _el: ElementRef, private _renderer: Renderer2) {}

    /**
     *
     */
    ngOnChanges() {
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
