import {Directive, ElementRef, HostListener, Renderer2} from '@angular/core';
import {ColorState} from '../utils/types';
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

    /**
     * Constructor of ChoiceDirective
     * @param _el ElementRef
     * @param _renderer Renderer2
     */
    constructor(private _el: ElementRef, private _renderer: Renderer2) {}

    /**
     * Update rendering on mouse hover
     */
    @HostListener('mouseover')
    onMouseHover(): void {
        if (!this._selected) {
            this._setColorStyle('white', 'green');
        }
    }

    /**
     * Update rendering on mouse out
     */
    @HostListener('mouseout')
    onMouseOut(): void {
        if (!this._selected) {
            this._setColorStyle('green', 'white');
        }
    }

    /**
     * Update rendering on mouse click
     */
    @HostListener('click')
    onClick(): void {
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
