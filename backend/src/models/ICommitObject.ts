import { ICommit } from "./ICommit";

export interface ICommitObject {
  sha: string;
  commit: ICommit;
  author: any;
  committer: any;
  parents: any;
}
