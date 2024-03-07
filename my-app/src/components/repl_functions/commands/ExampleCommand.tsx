import { REPLFunction } from '../REPLFunction';
import { PrintableString } from '../../utility/PrintableString';

/**
 * This is an example of a new custom command that a developer stakeholder can add.
 * To add a custom command, create a new TSX function in the parent folder of this file.
 * Then, import your file in CommandExecutor.tsx and add the command mapping in its constructor.
 * @param args any arguments following this command in the command line
 * @returns the output to be printed (Must be a Printable)
 */
export const exampleCommand: REPLFunction = (args: string[]): PrintableString => {
    if (args.length != 1) {
        const returnString = new PrintableString("Invalid argument length, correct usage: example [echo]");
        return returnString;
    } else {
        const returnString = new PrintableString(
            `This is an example command created through CommandExecutor and REPLFunction interface.
            This command takes in one argument, and echos it back: \n` + args[0]
        );
        return returnString;
    }
}
