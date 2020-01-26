import { createServer } from "http";
import { readFile } from "fs";
import { getAllPaths, getPath, initPublicFolder, updateRepos } from "./sh";
import { ANSIAttr } from "./@types/Colors";
import c from "./colors/colors";

const msg404 = "echo \"404 NOT FOUND\"";

process.on("uncaughtException", err => console.error("uncaughtException", err));
process.on("unhandledRejection", err => console.error("unhandledRejection", err));

const port: number = process.env.PORT ? parseInt(process.env.PORT) : 8080;


const server = createServer(function (request, response) {
	const term = request.headers["user-agent"]?.startsWith("Wget") || request.headers["user-agent"]?.startsWith("curl");
	const host = request.headers.host;
	const plain = request.headers.accept === "text/plain";
	console.log(c.aBlue("" + request.headers["user-agent"], [ANSIAttr.BOLD]), c.aGreen("" + request.method, [ANSIAttr.BOLD]), c.aBlue("" + request.url, [ANSIAttr.BOLD]));
	if (!request.url) {
		response.statusCode = 404;
		return response.end(msg404);
	}

	if (request.url === "/all") {
		term ?
			response.setHeader("Content-Type", "text/plain")
			:
			response.setHeader("Content-Type", "text/html");

		response.end(getAllPaths({term, host, plain}));
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

