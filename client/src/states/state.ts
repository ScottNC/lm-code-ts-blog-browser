import { STATE_MAP, STATE_RUN, singleState } from "./states";
export class State {
	#state: singleState = STATE_MAP.MENU;

	set(newState: singleState) {
		this.#state = newState;
	}
	
	async run() {
		await STATE_RUN[this.#state](this);
	}
}
