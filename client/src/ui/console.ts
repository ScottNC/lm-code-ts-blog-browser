import * as readline from "node:readline/promises";
import { EOL } from "os";

export function printNewLine() {
	console.log(EOL); // this imports the correct End-Of-Line for either Windows or Unix
}

export function print(str: string, newLine : boolean = true) {
	console.log(str);
	if (newLine)
		printNewLine();
}

export function clear(addTopBorder: boolean = false) {
	console.clear();
	if (addTopBorder) {
		print("------------------------------------");
	}
}

const reader = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

export async function prompt(prompt : string) {
	const answer : string = await reader.question(`${prompt}  > `);
	return answer;
}
