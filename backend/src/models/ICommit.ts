export interface ICommit {
  author: ICommitUser;
  committer: ICommitUser;
  message: string;
  tree: {
    url: string;
    sha: string;
  };
  url: string;
  comment_count: number;
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
