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
};
