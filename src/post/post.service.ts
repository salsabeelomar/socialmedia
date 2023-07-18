import { Inject, Injectable } from '@nestjs/common';
import { Post } from './entities/post.entity';

@Injectable()
export class PostService {
  constructor(
    @Inject('POSTS_REPOSITORY') private postRepository: typeof Post,
  ) {}

  async addPost() {
    await this.postRepository.create();
  }
  async paginationPost(page: number) {
    const offset = (page - 1) * 4;
    const posts = await this.postRepository.findAll({ offset, limit: 4 });
    return {
      posts,
    };
  }
  async deletePost() {
    await this.postRepository.create();
  }
  async updatePost() {
    await this.postRepository.create();
  }
}
