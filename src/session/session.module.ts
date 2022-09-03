import { Global, Module } from "@nestjs/common";
import { SessionService } from "./session.service";
import { SessionController } from "./session.controller";

@Global()
@Module({
  providers: [SessionService],
  exports: [SessionService],
  controllers: [SessionController]
})
export class SessionModule {}