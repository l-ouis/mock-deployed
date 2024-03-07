import {Printable} from './Printable';
import DOMPurify from 'dompurify';

/**
 * A class for printing a single string. It implements the Printable interface and just returns an
 * element wrapped in HTML tags
 */
export class PrintableString implements Printable<string> {
    data: string;
    constructor(data: string) {
        this.data = DOMPurify.sanitize(data);
    }

    /**
     * This just returns the new JSX object to be displayed given the input string
     * @returns the new JSX element
     */
    print(): JSX.Element {
        return <>{this.data}</>
    }
}