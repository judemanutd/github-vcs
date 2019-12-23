import { Controller, Get, Query, HttpException, HttpStatus } from "@nestjs/common";
import moment from "moment";
// import { ICommitObject } from "./models/ICommitObject";
import { GithubService } from "./services/github.service";

@Controller()
export class AppController {
  constructor(private readonly githubService: GithubService) {}

  @Get("/")
  async fetch(
    @Query("username") username?: string,
    @Query("repoName") repoName?: string,
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
      } else {
        // fetch history for the past 2 days if unspecified
        sinceISO = moment()
          .add(-2, "days")
          .toISOString();
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
      // filter out unwanted data
      // const parsedResponse = response.map((item: ICommitObject) => {
      //   const {
      //     commit: {
      //       author,
      //       committer,
      //       message,
      //       tree,
      //       verification: { reason, verified },
      //     },
      //     sha: shaResponse,
      //   } = item;

      //   return {
      //     sha: shaResponse,
      //     commit: {
      //       author,
      //       committer,
      //       message,
      //       verification: { reason, verified },
      //     },
      //   };
      // });

      return response;
    } catch (error) {
      throw error;
    }
  }
}
