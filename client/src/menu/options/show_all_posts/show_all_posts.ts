import { fetchAllPosts } from "../../../api/fetch_all_posts";
import { clear, print, prompt, printNewLine } from "../../../ui/console";
import { POST_KEYS, Post, USER_KEYS } from "../../../../../server/src/types/posts.types";
import { getSortBy, getSortOrder } from "../../get_options";

export async function showAllPosts() {
	clear(true);

	printNewLine();

	const limit : string = await prompt("What is the maximum posts you want to see? (Press [ENTER] for all of them)")

	const sortBy : string = await getSortBy(POST_KEYS as unknown as string[], 'posts');

	const authorSort : string = sortBy === 'author' ? await getSortBy(USER_KEYS as unknown as string[], 'posts') : '';

	const sortOrder : string = await getSortOrder('posts');
	
	print("📨 Fetching posts...");

	const result : Post[] = await fetchAllPosts({limit, sortBy, sortOrder, authorSort});

	print(`🥳 Received ${result.length} posts. Here they are:`);

	console.log(result);

	printNewLine();
	await prompt("⌨️ Press [ENTER] to return to the main menu! 🕶️");
}
