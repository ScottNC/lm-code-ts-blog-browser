import { baseUrl } from "./base_url";
import { User } from "../../../server/src/types/posts.types"

export async function fetchAllUsers({limit} : {limit: string} = {limit: ''}) {
	try {
		const result = await fetch(baseUrl + "/api/users/all" + (limit ? '?limit=' + limit : ''));
		const users: User[] = await result.json();
		return users;
	} catch {
		return [];
	}
}
