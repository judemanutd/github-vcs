import { Injectable } from "@nestjs/common";
import request from "request-promise-native";

@Injectable()
export class GithubService {
  private github_commit_url = (username: string = "judemanutd", repoName: string = "github-vcs") =>
    `https://api.github.com/repos/${username}/${repoName}/commits`;

  /***
   * fetch commit history from the github api
   *
   * @param username - username for the repo
   * @param repoName - repo name
   * @param sha - SHA or branch to start listing commits from. Default: the repository’s default branch
   * @param since - Only commits after this date will be returned. This is a timestamp in ISO 8601 format
   * @param until - Only commits before this date will be returned. This is a timestamp in ISO 8601 format
   */
  getCommits = async (
    username?: string,
    repoName?: string,
    sha?: string,
    since?: string,
    until?: string,
  ) => {
    try {
      const options: request.Options = {
        method: "GET",
        uri: this.github_commit_url(username, repoName),
        json: true,
        headers: {
          "User-Agent": "vcs-github",
        },
        qs: {},
      };

      if (sha) {
        options.qs.sha = sha;
      }

      if (since) {
        options.qs.since = since;
      }

      if (until) {
        options.qs.until = until;
      }

      return request(options);
    } catch (error) {
      throw error;
    }
  };
}
