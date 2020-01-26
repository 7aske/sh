import c from "../colors/colors";
import { ANSIAttr } from "../@types/Colors";

export default class RepoFile implements RepoFileType, IFmt {
	desc?: string;
	path: string;
	url: string;

	constructor(repoFile: RepoFileType) {
		this.desc = repoFile.desc;
		this.path = repoFile.path;
		this.url = repoFile.url;
	}


	toAnsiString(): string {
		return `${this.desc ? c.aMagenta(this.desc.substring(0, 78)) + "\n" : ""}${c.aCyan(this.url.padEnd(14, " "), [ANSIAttr.BOLD])} -> ${c.aWhite(this.path.padEnd(40, " "))}\n`;
	}

	toPlainString(): string {
		return `${this.desc ? this.desc.substring(0, 78) + "\n" : ""}${this.url.padEnd(14, " ")} -> ${this.path.padEnd(40, " ")}\n`;
	}

	toWebString(): string {
		return `${this.desc ? c.wMagenta(this.desc.substring(0, 78)) + "<br>" : ""}${"<a style='text-decoration: none' href='" + this.url + "'>" + c.wCyan(this.url.padEnd(14, " ")) + "</a>"}${c.wWhite(" -> " + this.path.padEnd(40, " "))}<br>`;
	}

}
