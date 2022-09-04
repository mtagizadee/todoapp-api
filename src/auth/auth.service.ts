import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { UsersService } from "../users/users.service";
import { LoginUserDto } from "./dto/login-user.dto";
import { CreateUserDto } from "../users/dto/create-user.dto";
import * as argon from 'argon2';
import { SessionService } from "../session/session.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UsersService,
    private readonly sessionService: SessionService
  ) {}

  async login(dto: LoginUserDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email
      }
    });
    if (!user) throw new NotFoundException('User does not exist.')

    const isPasswordCorrect = await argon.verify(user.password, dto.password);
    if (!isPasswordCorrect) throw new ForbiddenException('Provided password is incorrect');


    try {
      const session = await this.sessionService.create(user.id);
      return session.token;
    } catch (error) {
      throw error;
    }
  }

  async signup(dto: CreateUserDto) {
    const hash: string = await argon.hash(dto.password);
    try {
      const user = await this.userService.create({
        ...dto,
        password: hash
      });
      const session = await this.sessionService.create(user.id);
      return session.token;
    } catch (error) {
      throw error;
    }
  }
}