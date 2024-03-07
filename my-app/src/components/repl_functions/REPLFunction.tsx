import {Printable} from '../utility/Printable';

/**
 * A command-processor function for our REPL. The function returns a Printable, 
 * which is the value to print to history when the command is done executing.
 */
export interface REPLFunction {    
    (args: Array<string>): Printable<any>
}
