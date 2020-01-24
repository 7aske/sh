import { createServer } from "http";
import { readFile } from "fs";
import { extname } from "path";
import { initPublicFolder, getPath, getAllPaths, updateRepos } from "./sh";

const msg404 = "echo \"404 NOT FOUND\"";

process.on("uncaughtException", err => console.error("uncaughtException", err));
process.on("unhandledRejection", err => console.error("unhandledRejection", err));

const port: number = process.env.PORT ? parseInt(process.env.PORT) : 8080;

/**
 * Common MIME types based on extension
 */
const mimeTypes: { [key: string]: string } = {
	".html": "text/html",
	".js": "text/javascript",
	".css": "text/css",
	".json": "application/json",
	".png": "image/png",
	".jpg": "image/jpg",
	".gif": "image/gif",
	".wav": "audio/wav",
	".mp4": "video/mp4",
	".woff": "application/font-woff",
	".ttf": "application/font-ttf",
	".eot": "application/vnd.ms-fontobject",
	".otf": "application/font-otf",
	".svg": "application/image/svg+xml",
	".ico": "icon/x-icon",
};

const server = createServer(function (request, response) {

	console.log(request.method + " " + request.url);
	if (!request.url) {
		response.statusCode = 404;
		return response.end(msg404);
	}

	if (request.url === "/all") {
		response.setHeader("Content-Type", "text/plain");
		response.end(getAllPaths());
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
		const ext = extname(filepath!);
		if (ext.length > 0 && mimeTypes.hasOwnProperty(ext)) {
			mediaType = mimeTypes[ext];
		}

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
	console.log("👨‍🔧Server started on port " + port);
});

