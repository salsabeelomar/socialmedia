import { Inject, Injectable, BadRequestException } from '@nestjs/common';
import { Transaction } from 'sequelize';

import { Post } from './entities/post.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { ProviderConstants } from 'src/common/constant';
import { CheckExisting } from 'src/common/utils/CheckExisting';
import { Comment } from '../comment/entities/comment.entity';

@Injectable()
export class PostService {
  constructor(
    @Inject(ProviderConstants.POST_REPOSITORY)
    private postRepository: typeof Post,
  ) {}

  async addPost(
    content: string,
    user,
    transaction: Transaction,
  ): Promise<{
    post: {
      newPost: Post;
      username: any;
    };
  }> {
    const { id, username } = user;
    const newPost = await this.postRepository.create<Post>(
      {
        content,
        userId: id,
      },
      { transaction: transaction },
    );

    return {
      post: { newPost, username },
    };
  }
  async paginationPost(
    page: number,
    transaction: Transaction,
  ): Promise<Post[]> {
    const offset = (page - 1) * 4;
    const posts = await this.postRepository.findAll<Post>({
      attributes: { exclude: ['deleteBy', 'deletedAt', 'userId'] },
      include: [
        {
          model: User,
          attributes: ['username', 'id', 'email'],
          required: true,
        },
        {
          model: Comment,
          attributes: ['id', 'comment'],
          required: true,
        },
      ],
      offset,
      limit: 4,
      order: [['createdAt', 'DESC']],
      transaction: transaction,
    });
    return posts;
  }
  async deletePost(postId: number, id: number, transaction: Transaction) {
    const deletedPost = await this.postRepository.update<Post>(
      { deleteBy: id, deletedAt: new Date() },
      {
        where: {
          userId: id,
          id: postId,
        },
        transaction: transaction,
      },
    );
    CheckExisting(deletedPost[0], BadRequestException, 'Post not exist');

    return {
      message: 'Post Deleted Successfully ',
    };
  }

  async updatePost(
    content: string,
    postId: number,
    id: number,
    transaction: Transaction,
  ) {
    const updatedPost = await this.postRepository.update<Post>(
      {
        content,
      },
      {
        where: {
          userId: id,
          id: postId,
        },
        transaction: transaction,
      },
    );
    CheckExisting(updatedPost[0], BadRequestException, 'Post not exist');
    return {
      message: 'Updated Successfully ',
    };
  }
}
