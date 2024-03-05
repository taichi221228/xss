import { Hono } from "hono";
import fs from "fs";

const app = new Hono();

app.get("/", (c) => c.html(fs.readFileSync("index.html", "utf8")));

export default app;
