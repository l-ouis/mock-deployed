import { Printable } from './Printable';
import DOMPurify from 'dompurify';

/**
 * A class for printing a single row. It takes in an array of strings (a row) and converts it to a
 * javascript element for a table
 */
export class PrintableRow implements Printable<string[]> {
    data: string[];
    
    constructor(data: string[]) {
        this.data = data.map((elem) => DOMPurify.sanitize(elem));
    }

    /**
     * The print function turns the array into a JSX element to be displayed
     * @returns the table element
     */
    print(): JSX.Element {
        return (
            <table>
                <tbody>
                    <tr>
                        {this.data.map((elem, index) => (
                            <td key={index}>{elem}</td>
                        ))}
                    </tr>
                </tbody>
            </table>
        );
    }
}