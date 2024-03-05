import { Hono } from "hono";
import fs from "fs";

const app = new Hono();

const html = fs.readFileSync("index.html", "utf8");

app.get("/", (c) => c.html(html));

app.post("/submit", async (c) => {
	const { name } = await c.req.parseBody();
	return c.html(name.toString());
});

export default app;
