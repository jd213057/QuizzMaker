import {Directive, ElementRef, HostListener, Renderer2} from '@angular/core';
import {ColorState} from '../types';
/**
 * Attribute directive for a choice of a question
 */
@Directive({
    selector: '[choice]',
})
export class ChoiceDirective {
    /**
     * Indicates if element is selected
     */
    private _selected = false;

    constructor(private _el: ElementRef, private _renderer: Renderer2) {}

    /**
     * Update rendering on mouse hover
     */
    @HostListener('mouseover')
    onMouseHover() {
        if (!this._selected) {
            this._setColorStyle('white', 'green');
        }
    }

    /**
     * Update rendering on mouse out
     */
    @HostListener('mouseout')
    onMouseOut() {
        if (!this._selected) {
            this._setColorStyle('green', 'white');
        }
    }

    /**
     * Update rendering on mouse click
     */
    @HostListener('click')
    onClick() {
        this._setColorStyle('white', 'green');
        this._selected = !this._selected;
    }

    /**
     * Sets color and background-color styles
     * @param color string
     * @param backgroundColor string
     */
    private _setColorStyle(color: ColorState, backgroundColor: string): void {
        this._renderer.setStyle(this._el.nativeElement, 'color', color);
        this._renderer.setStyle(this._el.nativeElement, 'background-color', backgroundColor);
    }
}
