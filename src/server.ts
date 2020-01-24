import { createServer } from "http";
import { readFile } from "fs";
import { initPublicFolder, getPath, getAllPaths, updateRepos } from "./sh";

const msg404 = "echo \"404 NOT FOUND\"";

process.on("uncaughtException", err => console.error("uncaughtException", err));
process.on("unhandledRejection", err => console.error("unhandledRejection", err));

const port: number = process.env.PORT ? parseInt(process.env.PORT) : 8080;


const server = createServer(function (request, response) {
	const isTerm = request.headers["user-agent"]?.startsWith("Wget") || request.headers["user-agent"]?.startsWith("curl");
	console.log("\u001b[1;34m" + request.headers["user-agent"] + " \u001b[1;32m" + request.method + " \u001b[1;34m" + request.url+"\u001b[0m ");
	if (!request.url) {
		response.statusCode = 404;
		return response.end(msg404);
	}

	if (request.url === "/all") {
		response.setHeader("Content-Type", "text/plain");
		response.end(getAllPaths({color: isTerm}));
		return;
	}

	let filepath = getPath(request.url);

	if (!filepath) {
		response.statusCode = 404;
		return response.end(msg404);
	}

	readFile(filepath, function (err, data) {
		if (err) {
			response.statusCode = 404;
			return response.end(msg404);
		}

		let mediaType = "text/html";
		response.setHeader("Content-Type", mediaType);
		response.end(data);
	});
});

server.on("clientError", function onClientError(err, socket) {
	console.log("clientError", err);
	socket.end("HTTP/1.1 400 Bad Request\r\n\r\n");
});

server.listen(port, "0.0.0.0", function () {
	initPublicFolder();
	const updateInterval = setInterval(updateRepos, 1000 * 86400);
	console.log("👨‍🔧\u001b[1;32mServer started on port " + port + "\u001b[0m");
});

