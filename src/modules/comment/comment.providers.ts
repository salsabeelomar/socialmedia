import { ProviderConstants } from 'src/common/constant';
import { Comment } from './entities/comment.entity';

export const commentProvider = [
  {
    provide: ProviderConstants.COMMENT_REPOSITORY,
    useValue: Comment,
  },
];
