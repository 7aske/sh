import c from "../colors/colors";
import RepoFile from "./RepoFile";
import { ANSIAttr } from "../@types/Colors";

export default class Repo implements IFmt, RepoType {
	files: RepoFile[];
	name: string;
	remote: string;

	constructor(repo: RepoType) {
		this.files = [];
		repo.files.forEach(file => {
			this.files.push(new RepoFile(file));
		});
		this.name = repo.name;
		this.remote = repo.remote;
	}

	toAnsiString(): string {
		return c.aGreen(this.remote, [ANSIAttr.BOLD, ANSIAttr.UNDERSCORE]) + "\n";
	}

	toWebString(): string {
		return "<a style='text-decoration: none' href='" + this.remote + "'>" + c.wGreen(this.remote) + "</a>" + "<br>";
	}

	toPlainString(): string {
		return this.remote + "\n";
	}
}
