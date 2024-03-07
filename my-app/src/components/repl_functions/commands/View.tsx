import { REPLFunction } from '../REPLFunction';
import { PrintableString } from '../../utility/PrintableString';
import { mock } from '../CommandExecutor';

/**
 * This function handles the viewing aspect of this project. It implements the REPLFunction
 * interface so that it can be housed in a single map with the other REPL functions
 * @param args any arguments following view in the command line
 * @returns the output from calling the mocked view command
 */
export const view: REPLFunction = (args: string[]): PrintableString => {
    return mock.view(args);
}
