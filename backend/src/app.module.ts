import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { GithubService } from "./services/github.service";

@Module({
  imports: [],
  controllers: [AppController],
  providers: [GithubService],
})
export class AppModule {}
