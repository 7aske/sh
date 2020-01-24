import { extname } from "path";

/**
 * Common MIME types based on extension
 */
export const mimeTypes: { [key: string]: string } = {
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

export const getMIMEType = (filepath: string): string => {
	let mimeType = "text/plain";
	const ext = extname(filepath!);
	if (ext.length > 0 && mimeTypes.hasOwnProperty(ext)) {
		mimeType = mimeTypes[ext];
	}
	return mimeType;
};

