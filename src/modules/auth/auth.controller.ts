import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInType, SignUpType } from './dto';
import { Public } from 'src/common/decorator/public.decorator';
import { TransactionInterceptor } from 'src/common/interceptor/Transaction.interceptor';
import { TransactionDeco } from 'src/common/decorator/transaction.decorator';
import { Transaction } from 'sequelize';
@Public()
@UseInterceptors(TransactionInterceptor)
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  signIn(
    @Body() user: SignInType,
    @TransactionDeco() transaction: Transaction,
  ) {
    return this.authService.signIn(user, transaction);
  }

  @Public()
  @HttpCode(HttpStatus.CREATED)
  @Post('sign-up')
  signup(
    @Body() userInfo: SignUpType,
    @TransactionDeco() transaction: Transaction,
  ) {
    return this.authService.signUp(userInfo, transaction);
  }
}
