import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserType } from 'src/user/dto/user.dto';
import { SignInType, SignUpType } from './dto';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @UsePipes(new ValidationPipe())
  @Post('sign-in')
  signIn(@Body() user: SignInType) {
    console.log(user);
    return this.authService.signIn(user);
  }
  @UsePipes(new ValidationPipe())
  @Post('sign-up')
  signup(@Body() userInfo: SignUpType) {
    return this.authService.signUp(userInfo);
  }
}
