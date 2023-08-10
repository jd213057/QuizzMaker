import {Pipe, PipeTransform} from '@angular/core';
/**
 *  Pipe that removes escape sequences from a string and
 *  replaces them with the relevant characters
 */
@Pipe({
    name: 'unescape',
})
export class UnescapePipe implements PipeTransform {
    /**
     * Formats a string value managing escape sequences
     * @param value string
     * @returns string | null
     */
    transform(value: string): string | null {
        const doc = new DOMParser().parseFromString(value, 'text/html');
        return doc.documentElement.textContent;
    }
}
