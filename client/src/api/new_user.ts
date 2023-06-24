import { baseUrl } from "./base_url";

export async function addUser(name: string) {
	try {
		const result = await fetch(baseUrl + "/api/users/add", {
			headers: {
				"Content-Type": "application/json",
			},
			method: "POST",
      body: JSON.stringify({ name }),
		});
    
		const json : { success: boolean } = await result.json();

		const success : boolean = json.success;

		return success;
	} catch (e) {
		console.error(e);
		return false;
	}
}
