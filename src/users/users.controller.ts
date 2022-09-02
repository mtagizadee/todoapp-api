import { Controller, Get, NotFoundException, Param, ParseIntPipe } from "@nestjs/common";
import { UsersService } from "./users.service";

@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Get(':id')
  async findOneById(@Param('id', ParseIntPipe) id: number) {
    const user = await this.service.findOne({ id });
    if (!user) throw new NotFoundException('User is not found.')
    return { status: 200, user }
  }
}