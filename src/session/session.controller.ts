import { Controller, Delete, UseGuards } from "@nestjs/common";
import { AuthGuard } from "../auth/auth.guard";
import { CurrentUser } from "../users/current-user.decorator";
import { SessionService } from "./session.service";

@UseGuards(AuthGuard)
@Controller('session')
export class SessionController {
  constructor(private readonly service: SessionService) {}

  @Delete()
  async delete(@CurrentUser('id') userId: number) {
    return await this.service.delete({ userId });
  }
}