import { ProviderConstants } from 'src/common/constant';
import { User } from './entities/user.entity';

export const userProvider = [
  {
    provide: ProviderConstants.USER_REPOSITORY,
    useValue: User,
  },
];
