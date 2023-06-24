import { sendMessageToServer } from "../../../api/send_message_to_server";
import { clear, print, printNewLine, prompt } from "../../../ui/console";

export async function sendMessage() {
	clear();

	const message : string = await prompt("What message shall we send? ");

	printNewLine();
	print(`📨 Sending message "${message}"...`);

	const success : boolean = await sendMessageToServer(message);

	print(success ? "🥳 Message received successfully!" : "😵 Message NOT received.");

	await prompt("⌨️ Press [ENTER] to return to the main menu! 🕶️");
}
