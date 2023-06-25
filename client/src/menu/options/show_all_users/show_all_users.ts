import { fetchAllUsers } from "../../../api/fetch_all_users";
import { clear, print, prompt, printNewLine } from "../../../ui/console";
import { USER_KEYS, User } from "../../../../../server/src/types/posts.types";

const ORDER = [
	{
		name: 'Ascending',
		reference: 'asc'
	},
	{
		name: 'Descending',
		reference: 'desc'
	},
]

export async function showAllUsers() {
	clear(true);

	printNewLine();

	const limit : string = await prompt("What is the maximum posts you want to see? (Press [ENTER] for all of them)")

	const sortBy : string = await getSortBy();

	const sortOrder : string = await getSortOrder();

	print("📨 Fetching users...");

	const result: User[] = await fetchAllUsers({limit, sortBy, sortOrder});

	print(`🥳 Received ${result.length} users. Here they are:`);

	console.log(result);

	printNewLine();
	await prompt("⌨️ Press [ENTER] to return to the main menu! 🕶️");
}

async function getSortBy() {	
	const response : number | '' = await askQuery(USER_KEYS as unknown as string[]);

	if (response === '') return response;

	return USER_KEYS[response];
}

async function getSortOrder() {
	const response : number | '' = await askQuery(ORDER.map(a => a.name));

	if (response === '') return response;

	return ORDER[response].reference;
}

async function askQuery(options: string[]) {
	clear(true);

	printNewLine();

	options.forEach((key: string, idx: number) => console.log((idx + 1).toString() + '. ' + key))

	printNewLine();

	let keyStr: string;
	let key: number;
	
	do {
		keyStr = await prompt("Please select how you want to order the users? (Press ENTER to skip)");
		if (keyStr === '') return keyStr;
		key = parseInt(keyStr);
	}
	while (isNaN(key) || key <= 0 || key > options.length) 

	return key - 1;
}