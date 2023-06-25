import { baseUrl } from "./base_url";
import { Post } from "../../../server/src/types/posts.types"
import { getQuery } from "./get_query";

export async function fetchAllPosts(queryObj : {[key in string]: string} = {}) {
	try {
		const result = await fetch(baseUrl + "/api/posts/all" + getQuery(queryObj));
		const posts : Post[] = await result.json();
		return posts;
	} catch {
		return [];
	}
}
