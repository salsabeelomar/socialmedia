import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/modules/user/entities/user.entity';
import { SignInType, SignUpType } from './dto';
import { ProviderConstants } from 'src/common/constant';
import { Transaction } from 'sequelize';
import { CheckExisting } from 'src/common/utils/CheckExisting';

@Injectable()
export class AuthService {
  constructor(
    @Inject(ProviderConstants.USER_REPOSITORY) private userRepo: typeof User,
    private jwt: JwtService,
  ) {}

  generateToken(payload): string {
    return this.jwt.sign(payload);
  }
  async signIn(
    user: SignInType,
    transaction: Transaction,
  ): Promise<{
    user: User;
    token: string;
  }> {
    const userEmail = await this.userRepo.findOne({
      where: { email: user.email },
      transaction: transaction,
    });

    CheckExisting(
      userEmail,
      UnauthorizedException,
      'Invalid Email or password',
    );

    const userData = await this.userRepo.findOne({
      attributes: ['id', 'username', 'password', 'birthday', 'phoneNumber'],
      where: { email: user.email },
    });

    const isMatch = await bcrypt.compare(user.password, userData.password);

    CheckExisting(isMatch, BadRequestException, 'Invalid Email or password');

    const payload = {
      sub: userData.id,
      payload: {
        username: userData.username,
        email: user.email,
      },
    };
    const token = this.generateToken(payload);

    return {
      user: userData,
      token,
    };
  }
  async signUp(
    user: SignUpType,
    transaction: Transaction,
  ): Promise<{
    message: string;
    user: User;
    token: string;
  }> {
    const userEmail = await this.userRepo.findOne({
      where: { email: user.email },
    });
    CheckExisting(!userEmail, BadRequestException, 'Email is exits');
    try {
      user.password = bcrypt.hashSync(user.password, 10);
      const newUser = await this.userRepo.create(
        { ...user },
        {
          returning: ['id', 'email', 'username', 'birthday', 'phoneNumber'],
          transaction: transaction,
        },
      );

      const payload = {
        sub: newUser.id,
        payload: {
          username: newUser.username,
          email: user.email,
        },
      };
      const token = this.generateToken(payload);
      return {
        message: 'Account created successfully',
        user: newUser,
        token,
      };
    } catch (error) {
      throw new InternalServerErrorException('Creation new Account failed');
    }
  }
}
