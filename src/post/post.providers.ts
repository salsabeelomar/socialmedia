import { Post } from './entities/post.entity';

export const portProvider = [
  {
    provide: 'POSTS_REPOSITORY',
    useValue: Post,
  },
];
