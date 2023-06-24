import { User } from "../../../../../server/src/types/posts.types";
import { fetchAllUsers } from "../../../api/fetch_all_users";
import { STATE_MAP } from "../../../states/states";
import { clear, printNewLine, print, prompt } from "../../../ui/console";
import { addPost } from "../../../api/new_post";


export async function newPost() {
  const users: User[] = await fetchAllUsers();
	clear();
	users.forEach((user: User) => {
    print(user.id + ". " + user.name, false);
  });
	printNewLine();

	let userId : string;
  
  do {
    userId = await prompt("Which user is the author of the post? (Please pick one of the numbers above) ");
  }
  while (isNaN(parseInt(userId)) && users.some((user: User) => user.id === userId))

  const title: string = await prompt("What is the title? ");
  const text: string = await prompt("What is the content of the post? ")

  const success : boolean = await addPost({userId, title, text});

	print(success ? `🥳 ${title} post added successfully!` : "😵 Post wasn't added successfully.");

	await prompt("⌨️ Press [ENTER] to return to the main menu! 🕶️");

	return STATE_MAP.MENU;
}
