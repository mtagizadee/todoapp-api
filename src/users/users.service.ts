import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { Prisma } from "@prisma/client";

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(where: Prisma.UserWhereUniqueInput, select?: Prisma.UserSelect) {
    const user = await this.prisma.user.findUnique({ where });
    delete user.password;
    return user;
  }

  async create(dto: CreateUserDto) {
    try {
      return await this.prisma.user.create({ data: dto });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new BadRequestException('User with such email already exist.');
      } else {
        throw error;
      }
    }
  }
}