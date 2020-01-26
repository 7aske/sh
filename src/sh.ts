import { readFileSync, existsSync, mkdirSync } from "fs";
import { join } from "path";
import { execSync } from "child_process";
import YAML from "yaml";
import fmt from "./fmt";
import Repo from "./class/Repo";

export const publicFolder: string = join(process.cwd(), "shs");


let repos: Repo[] = [];

export const initPublicFolder = () => {
	try {
		let input: RepoType[] = YAML.parse(readFileSync("repos.yaml", {encoding: "utf8"})).repos;
		input.forEach(repo => {
			let newRepo = new Repo(repo);
			repos.push(newRepo);
		});
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
	if (options) {
		if (options.plain) {
			return fmt.plainFmt(repos, options.host);
		} else if (options.term) {
			return fmt.ansiFmt(repos, options.host);
		} else {
			return fmt.webFmt(repos, options.host);
		}
	} else {
		return fmt.plainFmt(repos);
	}
};

