import { ProviderConstants } from 'src/common/constant';
import { Post } from './entities/post.entity';

export const postProvider = [
  {
    provide: ProviderConstants.POST_REPOSITORY,
    useValue: Post,
  },
];
