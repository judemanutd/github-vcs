export interface ICommit {
  author: ICommitUser;
  committer: ICommitUser;
  message: string;
  tree: any;
  url: string;
  comment_count: 0;
  verification: IVerification;
}

export interface ICommitUser {
  name: string;
  email: string;
  date: string;
}

export interface IVerification {
  verified: boolean;
  reason: string;
}
