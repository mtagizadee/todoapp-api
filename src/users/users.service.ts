import { Injectable, NotFoundException } from "@nestjs/common";
import { User } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findOneById(id: number) {
    const user = await this.prisma.user.findUnique({
      select: {
        firstName: true,
        secondName: true,
        email: true
      },
      where: { id }
    });
  
    if (!user) throw new NotFoundException('User is not found');
    return { status: 200, user }
  }
}