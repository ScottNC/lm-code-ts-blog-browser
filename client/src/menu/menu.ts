import { STATE_MAP } from "../states/states";
import { clear, print, printNewLine, prompt } from "../ui/console";

export async function showMenu() {
	clear();
	print("0. Send Server Message", false);
	print("1. Show all posts", false);
	print("2. Show all users", false);
	print("3. Browse posts", false);
	print("4. Add user", false);
	print("5. Add post", false);
	printNewLine();

	const result : string = await prompt("What shall we do? ");

	return STATE_MAP[parseInt(result)] ?? STATE_MAP.UNKNOWN;
}
