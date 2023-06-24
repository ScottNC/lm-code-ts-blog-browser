import { baseUrl } from "./base_url";

export async function sendMessageToServer(message: string) {
	try {
		const result = await fetch(baseUrl + "/api/send/", {
			headers: {
				"Content-Type": "application/json",
			},
			method: "POST",
			body: JSON.stringify({ message }),
		});

		const json : { success: boolean } = await result.json();

		const success : boolean = json.success;

		return success;
	} catch (e) {
		console.error(e);
		return false;
	}
}
