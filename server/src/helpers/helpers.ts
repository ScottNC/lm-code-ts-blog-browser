import { EOL } from "os";

export function printNewLine() {
	console.log(EOL); // this imports the correct End-Of-Line for either Windows or Unix
}

export function getLimit(limitStr: string) {
	const givenLimit = parseInt(limitStr);
	return isNaN(givenLimit) ? null : givenLimit;
}