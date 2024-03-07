/**
 * This is the Printable interface that all REPL functions return a form of. It essentially allows
 * a REPL function to return a printable type in any form as long as it implements this interface. 
 */
export interface Printable<T> { 
    data: T;
    print(): JSX.Element; // Takes in an object's data-type and produces a JSX Element to print
}