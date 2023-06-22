import { baseUrl } from "./base_url";

export async function fetchPost(id : number) {
	try {
		const result = await fetch(baseUrl + "/api/posts/" + id.toString());
		const post = await result.json();
		return post;
	} catch {
		return [];
	}
}
