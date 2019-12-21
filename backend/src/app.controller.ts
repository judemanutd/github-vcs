import { Controller, Get } from "@nestjs/common";
// import { ConfigService } from "./config/config.service";

@Controller()
export class AppController {
  @Get("/")
  async fetch(): Promise<object> {
    return {
      message: "success",
    };
  }
}
