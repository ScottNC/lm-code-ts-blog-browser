import { STATE_MAP, singleState } from "./states";

export class State {
	#state: singleState = STATE_MAP.MENU;

	get() {
		return this.#state;
	}

	set(newState: singleState) {
		this.#state = newState;
	}
}
