import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { Prisma } from "@prisma/client";
import { UpdateTodoDto } from "./dto/update-todo.dto";
import { CreateTodoDto } from "./dto/create-todo.dto";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";

@Injectable()
export class TodosService {
  constructor(private readonly prisma: PrismaService) {}

  async validate(userId: number, id: number) {
    const todo = await this.prisma.todo.findFirst({
      where: { userId, id }
    });
    return !!todo;
  }

  async findMany(userId: number) {
    return await this.prisma.todo.findMany({
      where: { userId }
    });
  }

  async create(userId: number, dto: CreateTodoDto) {
    return await this.prisma.todo.create({
      data: {
        ...dto,
        userId
      }
    });
  }

  async update(where: Prisma.TodoWhereUniqueInput, dto: UpdateTodoDto) {
    try {
      return await this.prisma.todo.update({
        where,
        data: dto
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError && error.code === "P2001") {
        throw new NotFoundException("Todo with the provided id doesn't exist.")
      }
    }
  }

  async delete(where: Prisma.TodoWhereUniqueInput) {
    try {
      return await this.prisma.todo.delete({ where });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError && error.code === "P2001") {
        throw new NotFoundException("Todo with the provided id doesn't exist.")
      }
    }
  }

}
