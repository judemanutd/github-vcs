import { Controller, Get, Query, Param, HttpException, HttpStatus } from "@nestjs/common";
import moment from "moment";
import { GithubService } from "./services/github.service";

@Controller()
export class AppController {
  constructor(private readonly githubService: GithubService) {}

  @Get(":username/:repoName/commits")
  async fetchCommits(
    @Param("username") username?: string,
    @Param("repoName") repoName?: string,
    @Query("sha") sha?: string,
    @Query("since") since?: string,
    @Query("until") until?: string,
  ): Promise<object> {
    try {
      let sinceISO: string;
      let untilISO: string;
      if (since) {
        const sinceTimestamp = moment(since, moment.ISO_8601, true);
        if (!sinceTimestamp.isValid()) {
          throw new HttpException("Invalid since timestamp", HttpStatus.UNPROCESSABLE_ENTITY);
        }

        sinceISO = sinceTimestamp.toISOString();
      }

      if (until) {
        const untilTimestamp = moment(until, moment.ISO_8601, true);
        if (!untilTimestamp.isValid()) {
          throw new HttpException("Invalid until timestamp", HttpStatus.UNPROCESSABLE_ENTITY);
        }

        untilISO = untilTimestamp.toISOString();
      } else {
        untilISO = moment().toISOString();
      }

      const response = await this.githubService.getCommits(
        username,
        repoName,
        sha,
        sinceISO,
        untilISO,
      );

      return response;
    } catch (error) {
      throw error;
    }
  }

  @Get(":username/:repoName/branches")
  async fetchBranches(
    @Param("username") username?: string,
    @Param("repoName") repoName?: string,
  ): Promise<object> {
    try {
      const response = await this.githubService.getBranches(username, repoName);

      return response;
    } catch (error) {
      throw error;
    }
  }
}
