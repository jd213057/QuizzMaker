import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'unescape',
})
export class UnescapePipe implements PipeTransform {
    transform(value: string): any {
        const doc = new DOMParser().parseFromString(value, 'text/html');
        return doc.documentElement.textContent;
    }
}
