import Repo from "./class/Repo";
import { execSync } from "child_process";
import c from "./colors/colors";
import { ANSIAttr } from "./@types/Colors";

export const name = process.env.NAME ? process.env.NAME : "Nikola Tasic";
export const social = process.env.SOCIAL ? process.env.SOCIAL : "https://github.com/7aske";


const ansiFmt = (repos: Repo[], host?: string): string => {
	let out = `${c.aCyan(host ? host : "sh")} - ${c.aRed(name)} - ${c.aCyan(social, [ANSIAttr.BOLD, ANSIAttr.UNDERSCORE])}\n`;
	if (host) {
		out += c.aCyan(getFigletText(host), [ANSIAttr.BOLD]) + "\n";
	}
	repos.sort((a, b) => a.files.length - b.files.length).forEach(repo => {
		out += repo.toAnsiString();
		repo.files.sort((a, b) => a.url.localeCompare(b.url)).forEach(p => {
			out += p.toAnsiString();
		});
		out += "\n";
	});
	return out;
};

const plainFmt = (repos: Repo[], host?: string): string => {
	let out = `${host ? host : "sh"} - ${name} - ${social}\n`;
	if (host) {
		out += getFigletText(host) + "\n";
	}
	repos.sort((a, b) => a.files.length - b.files.length).forEach(repo => {
		out += repo.toPlainString();
		repo.files.sort((a, b) => a.url.localeCompare(b.url)).forEach(p => {
			out += p.toPlainString();
		});
		out += "\n";
	});
	return out;
};

const webFmt = (repos: Repo[], host?: string): string => {
	let wHeader = `${c.wCyan(host ? host : "sh")} - ${c.wRed(name)} - ${"<a style='text-decoration: none' href='" + social + "'>" + c.wCyan(social)}</a><br>`;
	if (host) {
		wHeader += c.wCyan(getFigletText(host)) + "<br>";
	}
	let out = "<html lang='en' style='background-color: black'><body><pre>" + wHeader;
	repos.sort((a, b) => a.files.length - b.files.length).forEach(repo => {
		out += repo.toWebString();
		repo.files.sort((a, b) => a.url.localeCompare(b.url)).forEach(p => {
			out += p.toWebString();
		});
		out += "<br>";
	});
	return out + "</pre></body></html>";
};

const getFigletText = (text: string): string => {
	return execSync(`figlet "${text}"`, {env: process.env, stdio: ["ignore", "pipe", "ignore"]}).toString();
};

const fmt: any = {
	getFigletText,
	plainFmt,
	webFmt,
	ansiFmt,
};

export default fmt;
