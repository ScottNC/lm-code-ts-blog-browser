import { baseUrl } from "./base_url";
import { User } from "../../../server/src/types/posts.types"
import { getQuery } from "./get_query";

export async function fetchAllUsers(queryObj : {[key in string]: string} = {}) {
	try {
		const result = await fetch(baseUrl + "/api/users/all" + getQuery(queryObj));
		const users: User[] = await result.json();
		return users;
	} catch {
		return [];
	}
}
