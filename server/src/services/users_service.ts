import { User } from "../types/posts.types";

const users = [
	{
		id: "1",
		name: "Spicy Hotfish",
		creationDate: new Date(),
	},
	{
		id: "2",
		name: "Sally-Anne Writerperson",
		creationDate: new Date(),
	},
	{
		id: "3",
		name: "Jimmy Alias",
		creationDate: new Date(),
	},
	{
		id: "4",
		name: 'Steve "The Hoop" Hooper',
		creationDate: new Date(),
	},
];

export function getAllUsers(): User[] {
	return users;
}

export function getUserById(userId: string) {
	return users.find((user: User) => user.id === userId);
}

export function addNewUser(name: string) {
	const newUser: User = {
		id: (users.length + 1).toString(),
		name,
		creationDate: new Date(),
	};

	users.push(newUser);
}
