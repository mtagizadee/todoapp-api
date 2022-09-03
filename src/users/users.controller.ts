import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Put, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CurrentUser } from "./current-user.decorator";
import { UpdateUserDto } from "./dto/update-user.dto";
import { AuthGuard } from "../auth/auth.guard";

@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Get(':id')
  async findOneById(@Param('id', ParseIntPipe) id: number) {
    const user = await this.service.findOne({ id });
    if (!user) throw new NotFoundException('User is not found.')
    return { status: 200, user }
  }

  @UseGuards(AuthGuard)
  @Put()
  async update(@CurrentUser('id') id: number, @Body() dto: UpdateUserDto) {
    const user = await this.service.update({ id },dto);
    return { status: 200, user }
  }

  @UseGuards(AuthGuard)
  @Delete()
  async delete(@CurrentUser('id') id: number) {
    const user = await this.service.delete({ id });
    return { status: 200, user }
  }
}