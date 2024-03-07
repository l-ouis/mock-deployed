import { REPLFunction } from './REPLFunction';
import { load } from './commands/Load';
import { view } from './commands/View';
import { search } from './commands/Search';
import { exampleCommand } from './commands/ExampleCommand';
import {Printable} from '../utility/Printable';
import {PrintableString} from '../utility/PrintableString';
import {mockedJson} from '../../mock_json/mockedJson';

//variable that the REPL functions can use to call on mocked responses
export const mock = new mockedJson();

/**
 * This class handles the execution of a command. It houses a map from a command name 
 * to the command itself so that when a user types a command into the command input box,
 * it can execute that command based on the name. 
 */
export class CommandExecutor {
    private commands: Map<string, REPLFunction>;

    /**
     * This is the constructor that initalizes the map and populates it with the known commands
     * of load_file, view, and search
     */
    constructor() {
        this.commands = new Map<string, REPLFunction>();
        // Add additional custom commands here
        this.registerCommand("example", exampleCommand);
        this.registerCommand("load_file", load);
        this.registerCommand("view", view);
        this.registerCommand("search", search);
    }

    /**
     * The registerCommand function simply adds a new commandName to commandFunction mapping to
     * the map
     * @param commandName the name of the command
     * @param commandFunction the actual command (implements REPLFunction)
     */
    public registerCommand(commandName: string, commandFunction: REPLFunction): void {
        if (!this.commands.has(commandName)) {
            this.commands.set(commandName, commandFunction);
        }
    }

    /**
     * This function takes in a command name and following arguments and uses the map to 
     * actual execute the command
     * @param commandName the name of the command
     * @param args the arguments following the commandName
     * @returns the Printable output of the command
     */
    public executeCommand(commandName: string, args: string[]): Printable<any> {
        const commandFunction = this.commands.get(commandName);
        if (commandFunction) {
            return commandFunction(args);
        } else {
            return new PrintableString("command not found");
        }
    }
}