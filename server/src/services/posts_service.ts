import { Post, User } from "../types/posts.types";
import { getUserById } from "./users_service";

const posts: Post[] = [
	{
		id: "1",
		title: "The Best Day of My Life",
		text: "I went to the zoo and I saw a giraffe! It was very big.",
		author: getUserById('1') as User, // this should look suspicious...
	},
	{
		id: "2",
		title: "Minutes of Our Recent Meeting",
		text: "Incentivize adoption exposing new ways to evolve our design language criticality . Can we align on lunch orders please advise soonest, for strategic staircase, so show pony, but run it up the flagpole. Big picture we have to leverage up the messaging, but proceduralize fast track , nor technologically savvy, can you put it on my calendar?. Paddle on both sides. High-level our competitors are jumping the shark, and today shall be a cloudy day, thanks to blue sky thinking, we can now deploy our new ui to the cloud turn the crank, canatics exploratory investigation data masking, so root-and-branch review. Quick win we want to empower the team with the right tools and guidance to uplevel our craft and build better first-order optimal strategies, yet corporate synergy. Curate form without content style without meaning, strategic staircase one-sheet, and green technology and climate change , or onward and upward, productize the deliverables and focus on the bottom line. Marginalised key performance indicators crank this out.",
		author: getUserById('2') as User, // 😬 doing it again..!
	},
	{
		id: "3",
		title: "The Worst Day of My Life",
		text: "I went to the zoo and the giraffes were asleep. Then I dropped my ice cream.",
		author: getUserById('3') as User, // 🤢 accessing arrays that aren't *guaranteed* to have these numbers in!
	},
]

export function getAllPosts(): Post[] {
	// Normally it's not advised to hard-code all your data!
	// in the absence of a true Model layer, our service can simply return a hard-coded array of posts

	return posts;
}

export function addNewPost({userId, title, text} : {userId: string, title: string, text: string}) {
	const author: User | undefined = getUserById(userId);

	if (author === undefined)
		return false;

	posts.push({
		id: (posts.length + 1).toString(),
		title,
		text,
		author,
	});
	
	return true;
} 