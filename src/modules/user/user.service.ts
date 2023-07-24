import { Injectable, Inject } from '@nestjs/common';
import { User } from './entities/user.entity';
import { ProviderConstants } from 'src/common/constant';

@Injectable()
export class UserService {
  constructor(
    @Inject(ProviderConstants.USER_REPOSITORY) private userRepo: typeof User,
  ) {}

  async getUserById(id: number) {
    const user = await this.userRepo.findByPk(id, {
      attributes: ['email', 'id', 'username'],
    });
    return {
      email: user.getDataValue('email'),
      id: user.getDataValue('id'),
      username: user.getDataValue('username'),
    };
  }
}
