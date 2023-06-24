import { baseUrl } from "./base_url";

export async function addPost(body: {userId: string, title: string, text: string}) {
	try {
		const result = await fetch(baseUrl + "/api/posts/add", {
			headers: {
				"Content-Type": "application/json",
			},
			method: "POST",
      body: JSON.stringify(body),
		});
    
		const json : { success: boolean } = await result.json();

		const success : boolean = json.success;

		return success;
	} catch (e) {
		console.error(e);
		return false;
	}
}
