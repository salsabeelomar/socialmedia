import { Injectable, Inject } from '@nestjs/common';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(@Inject('USER_REPOSITORY') private userRepo: typeof User) {}

  async getUserById(id: number) {
    const user = await this.userRepo.findByPk(id);
    return user;
  }
}
