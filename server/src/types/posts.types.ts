export const USER_KEYS = ['id', 'name', 'creationDate'] as const;
export const POST_KEYS = ['id', 'title', 'text', 'author'] as const;

export type UserKey = typeof USER_KEYS[number];
export type PostKey = typeof POST_KEYS[number];

export type User = {
	id: string;
	name: string;
	creationDate: Date;
};

export type Post = {
	id: string;
	title: string;
	text: string;
	author: User;
};
