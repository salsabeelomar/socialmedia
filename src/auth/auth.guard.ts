import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private jwt: JwtService, private userService: UserService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split('Bearer ')[1];

    if (!token) throw new UnauthorizedException('You must Login');

    const decoded = this.jwt.verify(token);
    const user = this.userService.getUserById(decoded.sub);
    request.user = user;
    return true;
  }
}
