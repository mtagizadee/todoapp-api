import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { Prisma } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";

@Injectable()
export class SessionService {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(where: Prisma.SessionWhereUniqueInput) {
    //remove expired sessions
    const sessions = await this.prisma.session.findMany();
    const currentDate = new Date();
    for (let i = 0; i < sessions.length; i++) {
      const session = sessions[i];
      if (session.expiresAt < currentDate) {
        await this.prisma.session.delete({ where: { id: session.id }});
      }
    }

    return await this.prisma.session.findUnique({ where });
  }

  async create(userId: number) {
    try {
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 3);
      return await this.prisma.session.create({
        data: {
          userId,
          expiresAt
        }
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError && error.code === "P2002") {
        throw new BadRequestException('Session already exist.');
      }
    }
  }

  async delete(where: Prisma.SessionWhereUniqueInput) {
    return await this.prisma.session.delete({ where });
  }
}