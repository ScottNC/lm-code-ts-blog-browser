import { fetchAllPosts } from "../../../api/fetch_all_posts";
import { clear, print, prompt, printNewLine } from "../../../ui/console";
import { Post } from "../../../../../server/src/types/posts.types";

export async function showAllPosts() {
	clear(true);

	printNewLine();

	print("📨 Fetching posts...");

	const result : Post[] = await fetchAllPosts();

	print(`🥳 Received ${result.length} posts. Here they are:`);

	console.log(result);

	printNewLine();
	await prompt("⌨️ Press [ENTER] to return to the main menu! 🕶️");
}
