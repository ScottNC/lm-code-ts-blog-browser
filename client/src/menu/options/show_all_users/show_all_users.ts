import { fetchAllUsers } from "../../../api/fetch_all_users";
import { clear, print, prompt, printNewLine } from "../../../ui/console";
import { USER_KEYS, User } from "../../../../../server/src/types/posts.types";
import { getSortBy, getSortOrder } from "../../get_options";

export async function showAllUsers() {
	clear(true);

	printNewLine();

	const limit : string = await prompt("What is the maximum posts you want to see? (Press [ENTER] for all of them)")

	const sortBy : string = await getSortBy(USER_KEYS as unknown as string[], 'users');

	const sortOrder : string = await getSortOrder('users');

	print("📨 Fetching users...");

	const result: User[] = await fetchAllUsers({limit, sortBy, sortOrder});

	print(`🥳 Received ${result.length} users. Here they are:`);

	console.log(result);

	printNewLine();
	await prompt("⌨️ Press [ENTER] to return to the main menu! 🕶️");
}
