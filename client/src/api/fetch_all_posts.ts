import { baseUrl } from "./base_url";
import { Post } from "../../../server/src/types/posts.types"

export async function fetchAllPosts({limit} : {limit: string}) {
	try {
		const result = await fetch(baseUrl + "/api/posts/all" + (limit ? '?limit=' + limit : ''));
		const posts : Post[] = await result.json();
		return posts;
	} catch {
		return [];
	}
}
