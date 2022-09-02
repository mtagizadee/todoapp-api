import { Module } from "@nestjs/common";
import { UsersModule } from "../users/users.module";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { SessionModule } from "../session/session.module";

@Module({
  imports: [UsersModule, SessionModule],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}