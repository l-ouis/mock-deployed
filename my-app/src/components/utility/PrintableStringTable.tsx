import {Printable} from './Printable';
import DOMPurify from 'dompurify';

/**
 * This class handles the conversion from a CSV string[][] to an HTML table. 
 */
export class PrintableStringTable implements Printable<string[][]> {
    data: string[][];
    headers: boolean;

    constructor(data: string[][], headers: boolean) {
        this.data = data.map((row) => row.map((elem) => DOMPurify.sanitize(elem)));
        this.headers = headers
    }

    /**
     * This function returns the converted table to then be displayed when called
     * @returns the new JSX table element to be displayed
     */
    // Slightly adapted from https://www.geeksforgeeks.org/how-to-build-an-html-table-using-reactjs-from-arrays/
    print(): JSX.Element {
        if (this.headers) {
            const headers = this.data[0];
            const data = this.data.slice(1);
            return (
                <table className="printable-string-table">
                    <thead>
                        <tr>
                            {headers.map((header, headerIndex) => (
                                <th key={headerIndex}>{header}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                {row.map((elem, elemIndex) => (
                                    <td key={elemIndex} className="printable-string-table">{elem}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            )
        } else {
            const data = this.data;
            return (
                <table>
                    <tbody>
                        {data.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                {row.map((elem, elemIndex) => (
                                    <td key={elemIndex} className="printable-string-table">{elem}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            )
        }        
    }
}