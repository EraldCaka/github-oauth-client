export interface CommitRes {
  sha: string;
  NodeID: string;
  commit: {
    author: {
      name: string;
      email: string;
      date: string;
    };
    committer: {
      name: string;
      email: string;
      date: string;
    };
    message: string;
    tree: Tree;
    url: string;
    comment_count: number;
    verification: Verification;
  };
  URL: string;
  HTMLURL: string;
  comments_url: string;
  author: UserCommit;
  committer: UserCommit;
  parents: Parent[];
}

interface Tree {
  SHA: string;
  URL: string;
}

interface Verification {
  verified: boolean;
  reason: string;
  signature: string;
  payload: string;
}

interface UserCommit {
  login: string;
  ID: number;
  NodeID: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
}

interface Parent {
  SHA: string;
  URL: string;
  HTMLURL: string;
}

export default CommitRes;
