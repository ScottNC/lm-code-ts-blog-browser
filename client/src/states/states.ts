import { sendMessage } from "../menu/options/send_message/send_message";
import { showAllPosts } from "../menu/options/show_all_posts/show_all_posts";
import { showAllUsers } from "../menu/options/show_all_users/show_all_users";
import { browsePosts } from "../menu/options/browse_posts/browse_posts";

export const MENU_STATE = "MENU";
export const REDO_STATES = ["UNKNOWN", "ADD_USER"] as const;

const API_STATES = [
  "SEND_MESSAGE",
  "SHOW_POSTS",
  "SHOW_USERS",
  "BROWSE_POSTS",
] as const;

type Menu = typeof MENU_STATE;
export type Redo = typeof REDO_STATES[number];
export type Api = typeof API_STATES[number];

export type AnyState = Menu | Redo | Api;

export const STATE_MAP: { [key in (string | number)]: AnyState } = {
	MENU: "MENU",
	UNKNOWN: "UNKNOWN",
	0: "SEND_MESSAGE",
	1: "SHOW_POSTS",
	2: "SHOW_USERS",
	3: "BROWSE_POSTS",
	4: "ADD_USER"
} as const;

export const REDO_MESSAGE: { [key in Redo] : string } = {
	UNKNOWN: "😵 We have entered an unknown state.",
	ADD_USER: "🏗️  This functionality has not been implemented!"
} as const;

export const API_RUN : { [key in Api] : () => Promise<void> } = {
	SEND_MESSAGE: sendMessage,
	SHOW_POSTS: showAllPosts,
	SHOW_USERS: showAllUsers,
	BROWSE_POSTS: browsePosts
} as const;