import { fetchAllUsers } from "../../../api/fetch_all_users";
import { clear, print, prompt, printNewLine } from "../../../ui/console";
import { User } from "../../../../../server/src/types/posts.types";

export async function showAllUsers() {
	clear(true);

	printNewLine();

	const limit : string = await prompt("What is the maximum posts you want to see? (Press [ENTER] for all of them)")

	print("📨 Fetching users...");

	const result: User[] = await fetchAllUsers({limit});

	print(`🥳 Received ${result.length} users. Here they are:`);

	console.log(result);

	printNewLine();
	await prompt("⌨️ Press [ENTER] to return to the main menu! 🕶️");
}
