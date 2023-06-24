import { fetchAllUsers } from "../../../api/fetch_all_users";
import { clear, print, prompt, printNewLine } from "../../../ui/console";
import { User } from "../../../../../server/src/types/posts.types";

export async function showAllUsers() {
	clear(true);

	printNewLine();

	print("📨 Fetching users...");

	const result: User[] = await fetchAllUsers();

	print(`🥳 Received ${result.length} users. Here they are:`);

	console.log(result);

	printNewLine();
	await prompt("⌨️ Press [ENTER] to return to the main menu! 🕶️");
}
