import * as express from "express";
import { Express } from "express";
import { addNewPost, getAllPosts } from "../services/posts_service";
import { addNewUser, getAllUsers } from "../services/users_service";
import { Post, User, UserKey, USER_KEYS, PostKey, POST_KEYS } from "../types/posts.types";
import { getLimit } from "../helpers/helpers";

/*

	This file hooks up routes such as `/` or `/users` with methods that can handle their response

	Normally we'd put those methods in a Controller layer, to keep them separate...

	... but for this little project we'll bypass that and keep the logic all in this one file.

*/

export function initialiseRoutes(app: Express) {
	console.log("🏗️  Setting up routers...");

	addBaseRouter(app);

	addAPIRoutes(app);
}

function addBaseRouter(app: Express) {
	console.log("🛠️  Creating base router...");

	const baseRouter = express.Router();

	baseRouter.use((req, res, next) => {
		res.header("Access-Control-Allow-Methods", "GET");
		console.log(`📨 ${req.url}`);
		next();
	});

	console.log("🏠❤️‍🩹  Adding home health check route...");
	baseRouter.get("/", (req, res) => {
		res.status(200).send("👍 Okay! The server is responding! 🙌");
	});

	console.log("🛠️  Applying base router to Express server...");
	app.use("/", baseRouter);
}

// this function adds all the routes we can access by going to /api/[someRoute]
function addAPIRoutes(app: Express) {
	console.log("🛠️  Creating API router...");

	const apiRouter = express.Router();
	apiRouter.use((req, res, next) => {
		// we'll use this router to return specifically JSON
		res.setHeader("Content-Type", "application/json");
		next();
	});

	// this route allows the client to "send a message" to the server
	console.log("📨  Adding messaging route...");
	apiRouter.post("/send/", (req, res) => {
		const { body } = req;

		// we don't do anything with the message, but let's echo it back in the console
		console.log(`👋 Received "${body.message}"`);

		// reply with a success boolean
		res.status(200).send({ success: true });
	});

	// now we'll add some routes that let us browse some blog posts
	console.log("✍️  Adding blog post routes...");
	apiRouter.get("/posts/all", (req, res) => {
		const posts : Post[] = getAllPosts();
		const limit : number = (typeof req.query?.limit === 'string' && getLimit(req.query.limit)) || posts.length;

		const sortBy: PostKey = (typeof req.query?.sortBy === 'string' && POST_KEYS.includes(req.query.sortBy as PostKey)
			&& req.query.sortBy as PostKey) || 'id';

		const sortOrder: number = req.query?.sortOrder === 'desc' ? -1 : 1;

		if (sortBy === 'id')
			posts.sort((a: Post, b: Post) => (parseInt(a[sortBy]) - parseInt(b[sortBy])) * sortOrder);
		else if (sortBy === 'text' || sortBy === 'title')
			posts.sort((a: Post, b: Post) => (a[sortBy].localeCompare(b[sortBy])) * sortOrder);
		else {
			const authorSort: UserKey = (typeof req.query?.authorSort === 'string' && USER_KEYS.includes(req.query.authorSort as UserKey)
				&& req.query.authorSort as UserKey) || 'id';

			if (authorSort === 'id')
				posts.sort((a: Post, b: Post) => (parseInt(a[sortBy][authorSort]) - parseInt(b[sortBy][authorSort])) * sortOrder);
			else if (authorSort === 'name')
				posts.sort((a: Post, b: Post) => (a[sortBy][authorSort].localeCompare(b[sortBy][authorSort])) * sortOrder);
			else 
				posts.sort((a: Post, b: Post) => (a[sortBy][authorSort].getTime() - b[sortBy][authorSort].getTime()) * sortOrder);
		}

		
		res.status(200).send(JSON.stringify(posts.slice(0, limit)));
	});

	apiRouter.get("/posts/:id", (req, res) => {
		const post = getAllPosts().find((p) => p.id === req.params.id);
		if (post !== undefined)
			res.status(200).send(JSON.stringify({ postFound: true, ...post }));
		else res.status(200).send(JSON.stringify({ postFound: false }));
	});

	apiRouter.post("/posts/add", (req, res) => {
		if (req.body?.userId && req.body?.title && req.body?.text) {
			const success = addNewPost(req.body);
			
			res.status(success? 200 : 400).send({success});
		}
		else
			res.status(400).send({success: false})
	})

	console.log("✍️  Adding user routes...");
	apiRouter.get("/users/all", (req, res) => {
		const users : User[] = getAllUsers();
		const limit : number = (typeof req.query?.limit === 'string' && getLimit(req.query.limit)) || users.length;

		const sortBy: UserKey = (typeof req.query?.sortBy === 'string' && USER_KEYS.includes(req.query.sortBy as UserKey)
			&& req.query.sortBy as UserKey) || 'id';

		const sortOrder: number = req.query?.sortOrder === 'desc' ? -1 : 1;

		if (sortBy === 'id')
			users.sort((a: User, b: User) => (parseInt(a[sortBy]) - parseInt(b[sortBy])) * sortOrder);
		else if (sortBy === 'name')
			users.sort((a: User, b: User) => (a[sortBy].localeCompare(b[sortBy])) * sortOrder);
		else 
			users.sort((a: User, b: User) => (a[sortBy].getTime() - b[sortBy].getTime()) * sortOrder);

		res.status(200).send(JSON.stringify(users.slice(0, limit)));
	});

	apiRouter.post("/users/add", (req, res) => {
		if (typeof req.body?.name === "string") {
			const name: string = req.body.name;
			addNewUser(name);
			res.status(200).send({success: true});
		}
		else
			res.status(400).send({success: false})
	})

	apiRouter.get("/users/:id", (req, res) => {
		res
			.status(200)
			.send(
				JSON.stringify(getAllUsers().filter((u) => u.id === req.params.id))
			);
	});

	console.log("🛠️  Applying API router to Express server...");
	app.use("/api", apiRouter);
}
