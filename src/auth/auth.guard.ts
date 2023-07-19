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
export class AuthGuard implements CanActivate {
  constructor(
    private jwt: JwtService,
    private readonly userService: UserService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split('Bearer ')[1];

    if (!token) throw new UnauthorizedException('You must Login');
    try {
      const decoded = await this.jwt.verifyAsync(token);
      const user = await this.userService.getUserById(decoded.sub);
      
      if (!user) {
        throw new UnauthorizedException('');
      }
      request.user = user.dataValues;
      return true;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
