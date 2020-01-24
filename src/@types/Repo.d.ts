import { RepoFile } from "./RepoFile";

export type Repo =  {
	name: string;
	remote: string;
	files: RepoFile[];
}
