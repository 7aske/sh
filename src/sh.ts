import { readFileSync, existsSync, mkdirSync } from "fs";
import { join } from "path";
import { execSync } from "child_process";
import YAML from "yaml";
import { Repo } from "./@types/Repo";
import { ShResponseOptions } from "./@types/ShResponseOptions";

export const publicFolder: string = join(process.cwd(), "shs");
export const name = "Nikola Tasic";
export const github = "https://github.com/7aske";

let repos: Repo[] = [];

export const initPublicFolder = () => {
	try {
		repos = YAML.parse(readFileSync("repos.yaml", {encoding: "utf8"})).repos;
	} catch (e) {
		console.error(e);
		process.exit(1);
	}

	if (!existsSync(publicFolder)) {
		mkdirSync(publicFolder, {recursive: true});
	}
	updateRepos();
};

export const updateRepos = () => {
	console.log("\u001b[1;32mUpdating repositories\u001b[0m");
	repos.forEach(repo => {
		if (!existsSync(join(publicFolder, repo.name))) {
			execSync(`git -C ${publicFolder} clone ${repo.remote}`, {env: process.env, stdio: "inherit"});
		} else {
			execSync(`git -C ${join(publicFolder, repo.name)} pull`, {env: process.env, stdio: "inherit"});
		}
	});
};

export const getPath = (url: string): string | null => {
	for (let repo of repos) {
		const p = repo.files.find(repoPath => repoPath.url === url);
		if (p) {
			return join(publicFolder, repo.name, p.path);
		}
	}
	return null;
};

export const getAllPaths = (options?: ShResponseOptions): string => {
	let out = "";
	if (options && options.color) {
		out = `\u001b[1;32msh\u001b[0m - ${name}\u001b[0m - \u001b[1;32m${github}\u001b[0m\n`;
	} else {
		out = `sh - ${name} - ${github}\n`;
	}
	repos.sort((a, b) => a.files.length - b.files.length).forEach(repo => {
		if (options && options.color) {
			out += "\u001b[1;4;31m" + repo.remote + "\u001b[0m" + "\n";
		} else {
			out += repo.remote + "\n";
		}
		repo.files.sort((a, b) => a.url.localeCompare(b.url)).forEach(p => {
			if (options && options.color) {
				out += `${"\u001b[1;32m" + p.url.padEnd(12, " ") + "\u001b[0m"} -> ${p.path.padEnd(40, " ")}${p.desc ? "\n\u001b[1;3;34m" + p.desc.substring(0, 78) + "\u001b[0m" : ""}\n`;
			} else {
				out += `${p.url.padEnd(12, " ")} -> ${p.path.padEnd(40, " ")}${p.desc ? "\n" + p.desc.substring(0, 78) : ""}\n`;
			}
		});
		out += "\n";
	});
	return out;
};

