import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards
} from "@nestjs/common";
import { CurrentUser } from "../users/current-user.decorator";
import { AuthGuard } from "../auth/auth.guard";
import { TodosService } from "./todos.service";
import { CreateTodoDto } from "./dto/create-todo.dto";
import { UpdateTodoDto } from "./dto/update-todo.dto";

@Controller('todos')
export class TodosController {
  constructor(private readonly service: TodosService) {}

  @Get(':id')
  async findMany(@Param('id',ParseIntPipe) userId: number) {
    const todos = await this.service.findMany(userId);
    return { status: 200, todos }
  }

  @UseGuards(AuthGuard)
  @Post()
  async create(@CurrentUser('id') userId: number, @Body() dto: CreateTodoDto) {
    const todo = await this.service.create(userId,dto);
    return { status: 200, todo }
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  async update(
    @CurrentUser('id') userId: number,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateTodoDto
  ) {
    if (!await this.service.validate(userId, id))
      throw new ForbiddenException("User can't update todo that doesn't belong to them")
    const todo = await this.service.update({ id }, dto);
    return { status: 200, todo }
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async delete(
    @CurrentUser('id') userId: number,
    @Param('id', ParseIntPipe) id: number
  ) {
    if (!await this.service.validate(userId, id))
      throw new ForbiddenException("User can't delete todo that doesn't belong to them")
    const todo = await this.service.delete({ id });
    return { status: 200, todo }
  }
}
