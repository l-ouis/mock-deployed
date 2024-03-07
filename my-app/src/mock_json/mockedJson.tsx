import {Printable} from '../components/utility/Printable';
import {PrintableString} from '../components/utility/PrintableString';
import {PrintableStringTable} from '../components/utility/PrintableStringTable';
import {PrintableRow} from '../components/utility/PrintableRow';

/**
 * This class stores example CSVs and handles mocking the responses for calls like search, view, 
 * and load_file
 */
export class mockedJson {
    private currentCsv: string = "";
    private availableCsvs: Map<string, string[][]>;

    // Mocked data
    private simpleCsv: string[][];
    private headerCsv: string[][];
    private badRequest: string[][];
    private evilCsv: string[][];
    private bigCsv: string[][];

    /**
     * This constructor sets up the example CSVs and creates a map between the CSV and the 
     * file path
     */
    constructor() { // Populate these with actual Csvs?
        this.simpleCsv = [
            ["one", "two", "three", "four"],
            ["five", "six", "seven", "eight"],
            ["nine", "ten", "eleven", "twelve"]];
        this.headerCsv = [
            ["header1", "header2"],
            ["notaheader", "element"],
            ["another not-header", "final not-header"]];
        this.badRequest = [["placeholder"]];
        this.evilCsv = [["</tr><button>hacked, harharhar!</button>"]];
        this.bigCsv = [
            ["one", "two", "three", "four", "one", "two", "three", "four",
            "one", "two", "three", "four", "one", "two", "three", "four",
            "one", "two", "three", "four", "one", "two", "three", "four"],
            ["five", "six", "seven", "eight", "five", "six", "seven", "eight",
            "five", "six", "seven", "eight", "five", "six", "seven", "eight",
            "five", "six", "seven", "eight", "five", "six", "seven", "eight"],
            ["nine", "ten", "eleven", "twelve", "nine", "ten", "eleven", "twelve",
            "nine", "ten", "eleven", "twelve", "nine", "ten", "eleven", "twelve",
            "nine", "ten", "eleven", "twelve", "nine", "ten", "eleven", "twelve"]];
        
        this.availableCsvs = new Map();
        this.availableCsvs.set('data/simple.csv', this.simpleCsv);
        this.availableCsvs.set('data/header.csv', this.headerCsv);
        this.availableCsvs.set('data/imaginary.csv', this.badRequest);
        this.availableCsvs.set('data/secretfolder/evil.csv', this.evilCsv);
        this.availableCsvs.set('data/big.csv', this.bigCsv);
    }

    /**
     * This request function 'emulates' an API server more accurately, but isn't necessary for now.
     * Depending on how the Server API communicates with individual REPLFunctions, behavior can
     * be modeled similar to this function.
     * @param args List of arguments to a server API
     * @returns Mocked responses based on list of arguments
     */
    request(args: string[]): Printable<any> {
        if (args[0] == "loadcsv") {
            return this.load(args.slice(1));
        }
        if (args[0] == "viewcsv") {
            return this.view(args.slice(1));
        } 
        if (args[0] == "searchcsv") {
            return this.search(args.slice(1));
        } else {
            return new PrintableString("command error - available commands: load_file, view, search")
        }
    }

    /**
     * This function handles the mocking of the load functionality. It stores the CSV in a variable
     * and returns a message saying whether or not the loading was successful. 
     * @param args the arguments for load (filepath)
     * @returns either a successful loading message or a failure
     */
    load(args: string[]): Printable<any> {
        // Check for correct arguments
        if (args.length != 1) {
            return new PrintableString(" Invalid argument length, correct usage: load_file [path to file]");
        }
        const path = args[0];
        if (this.availableCsvs.has("data/" + path)) {
            // Load the path inside mockedJson
            this.currentCsv = "data/" + path;
            return new PrintableString(`File "${path}" has been loaded.`);
        } else {    
            return new PrintableString(" File not found. Make sure file is in data/ directory.");
        }
    }

    /**
     * This function handles the mocking of the view functionality. If a CSV has been loaded, 
     * it will display the CSV or else it will display an error
     * @param args the arguments for load (should not be any)
     * @returns either the CSV to be viewed or a failure message
     */
    view(args: string[]): Printable<any> {
        // Check for correct arguments (for sanity)
        if (args.length != 0) {
            return new PrintableString("Incorrect usage: view has no arguments.");
        }
        if (this.availableCsvs.has(this.currentCsv)) {
            // Headers should really be checked for 'view' as well, but since CSVParser did not specify it,
            // we will just assume headers are false for viewcsv
            return new PrintableStringTable(this.availableCsvs.get(this.currentCsv)!, false);
        } else {
            return new PrintableString("Please load a file first using load_file.");
        }
    }

    /**
     * This function handles the mocking of the search functionality. If a CSV has been loaded, 
     * it will "search" the CSV and display the row the value was found in (if found). Otherwise, 
     * it will just return a failure message
     * @param args the arguments for search (column and value)
     * @returns the row that the value was found in, or a failure message
     */
    search(args: string[]): Printable<any> {
        if (args.length != 2) {
            return new PrintableString("Invalid argument length, correct usage: search [header_id] [term]")
        }
        if (this.availableCsvs.has(this.currentCsv)) {
            if (this.availableCsvs.get(this.currentCsv) == this.simpleCsv) {
                if (args[0] == "0" && args[1] == "one") {
                    let csv: string[][] | undefined = this.availableCsvs.get(this.currentCsv);
                    if (csv !== undefined) {
                        return new PrintableRow(csv[0]);
                    }
                }
            } else if (this.availableCsvs.get(this.currentCsv) == this.headerCsv) {
                if (args[0] == "header2" && args[1] == "element") {
                    let csv: string[][] | undefined = this.availableCsvs.get(this.currentCsv);
                    if (csv !== undefined) {
                        return new PrintableRow(csv[1]);
                    }
                }
            }
            return new PrintableString("Search failed: value not found")
        } else {
            return new PrintableString("Please load a file first using load_file.");
        }
    }
}