import { State } from "./states/state";
import { clear, print, prompt } from "./ui/console";

async function begin() {
	clear(true);
	print("👋 Welcome to our cool blog browser!");
	await prompt("⌨️ Press [ENTER] to continue! 🕶️");
	main();
}

async function main() {
	let state: State = new State();

	while (true)
		await state.run();
}

begin();
