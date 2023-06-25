import { fetchAllUsers } from "../../../api/fetch_all_users";
import { clear, print, prompt, printNewLine } from "../../../ui/console";
import { USER_KEYS, User } from "../../../../../server/src/types/posts.types";

export async function showAllUsers() {
	clear(true);

	printNewLine();

	const limit : string = await prompt("What is the maximum posts you want to see? (Press [ENTER] for all of them)")

	const sortBy : string = await getSortBy();

	print("📨 Fetching users...");

	const result: User[] = await fetchAllUsers({limit, sortBy});

	print(`🥳 Received ${result.length} users. Here they are:`);

	console.log(result);

	printNewLine();
	await prompt("⌨️ Press [ENTER] to return to the main menu! 🕶️");
}

async function getSortBy() {
	clear(true);

	printNewLine();

	USER_KEYS.forEach((key: string, idx: number) => console.log((idx + 1).toString() + '. ' + key))

	printNewLine();

	let keyStr: string;
	let key: number;
	
	do {
		keyStr = await prompt("Please select how you want to order the users? (Press ENTER to skip)");
		if (keyStr === '') return '';
		key = parseInt(keyStr);
	}
	while (isNaN(key) || key <= 0 || key > USER_KEYS.length) 

	return USER_KEYS[key - 1];
}