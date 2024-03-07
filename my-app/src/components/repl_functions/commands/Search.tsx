import { REPLFunction } from '../REPLFunction';
import { PrintableString } from '../../utility/PrintableString';
import { mock } from '../CommandExecutor';

/**
 * This function handles the searching aspect of this project. It implements the REPLFunction
 * interface so that it can be housed in a single map with the other REPL functions
 * @param args any arguments following search in the command line
 * @returns the output from calling the mocked search command
 */
export const search: REPLFunction = (args: string[]): PrintableString => {
    return mock.search(args);
}