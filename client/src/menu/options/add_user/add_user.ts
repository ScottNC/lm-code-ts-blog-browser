import { clear, print, printNewLine, prompt } from "../../../ui/console";
import { addUser } from "../../../api/new_user";

export async function newUser() {
	clear();

	const name : string = await prompt("What is the new User's name? ");

	printNewLine();

	const success : boolean = await addUser(name);

	print(success ? `🥳 ${name} added successfully!` : "😵 Name needs to be string.");

	await prompt("⌨️ Press [ENTER] to return to the main menu! 🕶️");
}
