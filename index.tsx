import { Hono } from "hono";
import type { FC } from "hono/jsx";
import fs from "fs";

const app = new Hono();

export const Html: FC = () => {
	return (
		<>
			<html lang="en">
				<head>
					<meta charSet="UTF-8" />
					<meta
						name="viewport"
						content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
					/>
					<meta httpEquiv="X-UA-Compatible" content="ie=edge" />
					<title>XSS</title>
				</head>
				<body>
					<h1>XSS</h1>
					<form action="/submit" method="post">
						<label>
							<input
								type="text"
								name="name"
								value="<script>alert('XSS');</script>"
							/>
						</label>
						<input type="submit" value="Submit" />
					</form>
				</body>
			</html>
		</>
	);
};

app.get("/", (c) => c.html(<Html />));

app.post("/submit", async (c) => {
	const { name } = await c.req.parseBody();
	return c.html(name.toString());
});

export default app;
