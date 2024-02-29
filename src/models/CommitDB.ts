interface CommitDB {
  id?: number;
  commit_sha: string;
  date: Date;
  repo_id: number;
}
export default CommitDB;
