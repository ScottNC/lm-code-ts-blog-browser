import { fetchPost } from "../../../api/fetch_post";
import { clear, print, prompt, printNewLine } from "../../../ui/console";
import { Post } from "../../../../../server/src/types/posts.types";

export async function browsePosts() {
	clear();

	let postId: string;
	let desiredPostId: number;
	
	do {
		postId = await prompt("Enter Post ID (Please enter a number)");
		desiredPostId = parseInt(postId);
	}
	while (isNaN(desiredPostId)) 

	print(`📨 Fetching post ${postId}...`);

	const result: Post | never[] = await fetchPost(desiredPostId);

	print(`🥳 Received post:`);

	console.log(result);

	printNewLine();
	await prompt("⌨️ Press [ENTER] to return to the main menu! 🕶️");
}
