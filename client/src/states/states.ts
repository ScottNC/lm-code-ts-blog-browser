import { State } from "./state";
import { clear, print, prompt } from "../ui/console";
import { sendMessage } from "../menu/options/send_message/send_message";
import { showMenu } from "../menu/menu";
import { showAllPosts } from "../menu/options/show_all_posts/show_all_posts";
import { showAllUsers } from "../menu/options/show_all_users/show_all_users";
import { browsePosts } from "../menu/options/browse_posts/browse_posts";

export const STATES = [
  "SEND_MESSAGE",
  "MENU",
  "SHOW_POSTS",
  "SHOW_USERS",
  "BROWSE_POSTS",
  "ADD_USER",
  "UNKNOWN",
] as const;

export type singleState = typeof STATES[number];

export const STATE_MAP: { [key in (string | number)]: singleState } = {
	MENU: "MENU",
	UNKNOWN: "UNKNOWN",
	0: "SEND_MESSAGE",
	1: "SHOW_POSTS",
	2: "SHOW_USERS",
	3: "BROWSE_POSTS",
	4: "ADD_USER"
} as const;

export const STATE_RUN : { [key in singleState] : (state: State) => Promise<void> } = {
  "SEND_MESSAGE" : async (state: State) => {
		const nextState : singleState = await sendMessage();
		state.set(nextState);
	},
  "MENU" : async (state: State) => {
		const newMenuOption : singleState = await showMenu();
		state.set(newMenuOption);
	},
  "SHOW_POSTS" : async (state: State) => {
		clear();
		await showAllPosts();
		state.set(STATE_MAP.MENU);
	},
  "SHOW_USERS" : async (state: State) => {
		clear();
		await showAllUsers();
		state.set(STATE_MAP.MENU);
	},
  "BROWSE_POSTS" : async (state: State) => {
		clear();
		await browsePosts();
		state.set(STATE_MAP.MENU);
	},
  "ADD_USER" : async (state: State) => {
		clear();
		print("🏗️  This functionality has not been implemented!");
		await prompt("⌨️ Press [ENTER] to return to the main menu! 🕶️");
		state.set(STATE_MAP.MENU);
	},
  "UNKNOWN" : async (state: State) => {
		clear();
		print("😵 We have entered an unknown state.");
		await prompt("⌨️ Press [ENTER] to return to the main menu! 🕶️");
		state.set(STATE_MAP.MENU);
	},
} as const;