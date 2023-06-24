import { MENU_STATE, REDO_STATES, API_RUN, REDO_MESSAGE, AnyState, Redo, Api } from "./states";
import { clear, print, prompt } from "../ui/console";
import { showMenu } from "../menu/menu";
export class State {
	#state: AnyState = MENU_STATE;

	set(newState: AnyState) {
		this.#state = newState;
	}
	
	async run() {
		if (this.#state === MENU_STATE)
			await this.menu();
		else if (REDO_STATES.some((a: AnyState) => a === this.#state))
			await this.redo();
		else 
			await this.api();
	}

	async menu() {
		const newMenuOption : AnyState = await showMenu();
		this.set(newMenuOption);
	}

	async redo() {
		clear();
		const message = REDO_MESSAGE[this.#state as Redo];
		print(message);
		await prompt("⌨️ Press [ENTER] to return to the main menu! 🕶️");
		this.set(MENU_STATE);
	}

	async api() {
		clear();
		const run = API_RUN[this.#state as Api]
		await run();
		this.set(MENU_STATE);
	}
}
