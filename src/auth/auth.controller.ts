import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginUserDto } from "./dto/login-user.dto";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { CurrentUser } from "../users/current-user.decorator";
import { AuthGuard } from "./auth.guard";

@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post('login')
  async login(@Body() dto: LoginUserDto) {
    const token: string = await this.service.login(dto);
    return { status: 200, token }
  }

  @Post('signup')
  async signup(@Body() dto: CreateUserDto) {
    const token: string = await this.service.signup(dto);
    return { status: 200, token }
  }

  @UseGuards(AuthGuard)
  @Get('current-user')
  getCurrentUser(@CurrentUser() user) {
    return { status: 200, user };
  }
}