import { baseUrl } from "./base_url";
import { Post } from "../../../server/src/types/posts.types"

export async function fetchPost(id : number) {
	try {
		const result = await fetch(baseUrl + "/api/posts/" + id.toString());
		const post : Post = await result.json();
		return post;
	} catch {
		return [];
	}
}
