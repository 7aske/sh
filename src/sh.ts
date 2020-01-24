import { readFileSync, existsSync, mkdirSync } from "fs";
import { join } from "path";
import { execSync } from "child_process";

export const publicFolder: string = join(process.cwd(), "shs");

type Path = {
	pathname: string;
	path: string;
}

interface Repo {
	name: string;
	url: string;
	paths: Path[];
}

let repos: Repo[] = [];

export const initPublicFolder = () => {
	repos = JSON.parse(readFileSync("repos.json", {encoding: "utf8"})).repos;
	if (!existsSync(publicFolder)) {
		mkdirSync(publicFolder, {recursive: true});
	}
	updateRepos();
};

export const updateRepos = () => {
	console.log("Updating repositories");
	repos.forEach(repo => {
		if (!existsSync(join(publicFolder, repo.name))) {
			execSync(`git -C ${publicFolder} clone ${repo.url}`, {env: process.env, stdio: "inherit"});
		} else {
			execSync(`git -C ${join(publicFolder, repo.name)} pull`, {env: process.env, stdio: "inherit"});
		}
	});
};

export const getPath = (pathname: string): string | null => {
	for (let repo of repos) {
		const p = repo.paths.find(repoPath => repoPath.pathname === pathname);
		if (p) {
			return join(publicFolder, repo.name, p.path);
		}
	}
	return null;
};

export const getAllPaths = (): string => {
	let out = "";
	repos.sort((a,b)=> a.paths.length - b.paths.length).forEach(repo => {
		out += repo.url + "\n";
		repo.paths.sort((a,b)=> a.pathname.localeCompare(b.pathname)).forEach(p => {
			out += `${p.pathname.padEnd(14, " ")} -> ${repo.name}/${p.path}\n`;
		});
		out += "\n";
	});
	return out;
};

