import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { SessionService } from "../session/session.service";
import { UsersService } from "../users/users.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly sessionsService: SessionService,
    private readonly userService: UsersService
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const authorization: string = request.headers.authorization;
    if (!authorization) throw new ForbiddenException('Please provide authorization token in headers.');

    const partition = authorization.split(' ');
    if (partition.length != 2 || partition[0] != 'Bearer') throw new ForbiddenException('Authorization token is not valid. It should be Bearer Token');

    const token: string = partition[1];
    const session = await this.sessionsService.findOne({ token });
    if (!session) throw new ForbiddenException('Session of this user was expired.');

    request.user = await this.userService.findOne(
      { id: session.userId }
    )
    return true;
  }
}