import { clear, printNewLine, prompt } from "../ui/console";

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

export async function getSortBy(options: string[], item : string) {	
	const response : number | '' = await askQuery(options, item);
	return response === '' ? response : options[response];
}

export async function getSortOrder(item: string) {
	const response : number | '' = await askQuery(ORDER.map(a => a.name), item);
	return response === '' ? response : ORDER[response].reference;
}

async function askQuery(options: string[], item: string) {
	clear(true);

	printNewLine();

	options.forEach((key: string, idx: number) => console.log((idx + 1).toString() + '. ' + key))

	printNewLine();

	let keyStr: string | null;
	let key: number;
	
	do {
		keyStr = await prompt(`Please select how you want to order the ${item}? (Press ENTER to skip)`);
		if (keyStr === '' || keyStr === null) return '';
		key = parseInt(keyStr);
	}
	while (isNaN(key) || key <= 0 || key > options.length) 

	return key - 1;
}