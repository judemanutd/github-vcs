import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { ConfigModule } from "./config/config.module";
import { GithubService } from "./services/github.service";

@Module({
  imports: [ConfigModule],
  controllers: [AppController],
  providers: [GithubService],
})
export class AppModule {}
