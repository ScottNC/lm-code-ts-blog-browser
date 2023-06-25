import { baseUrl } from "./base_url";
import { User } from "../../../server/src/types/posts.types"

export async function fetchAllUsers(queryObj : {[key in string]: string} = {}) {
	try {
		const result = await fetch(baseUrl + "/api/users/all" + getQuery(queryObj));
		const users: User[] = await result.json();
		return users;
	} catch {
		return [];
	}
}

function getQuery(queryObj : {[key in string]: string}) {
	return Object.entries(queryObj).reduce((query: string , [key, value] : [string, string]) => {
		if (value !== '') {
			query += (query === '' ? '?' : '&') + key + '=' + value;
		}

		return query;
	}, '');
}
