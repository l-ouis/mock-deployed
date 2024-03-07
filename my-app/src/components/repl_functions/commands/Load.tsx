import { REPLFunction } from '../REPLFunction';
import { PrintableString } from '../../utility/PrintableString';
import { mock } from '../CommandExecutor';

/**
 * This function handles the loading aspect of this project. It implements the REPLFunction
 * interface so that it can be housed in a single map with the other REPL functions
 * @param args any arguments following load in the command line
 * @returns the output from calling the mocked load command
 */
export const load: REPLFunction = (args: string[]): PrintableString => {
    return mock.load(args);
}
