import {
  Inject,
  Injectable,
  InternalServerErrorException,
  BadRequestException,
  Request,
} from '@nestjs/common';
import { Post } from './entities/post.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class PostService {
  constructor(
    @Inject('POSTS_REPOSITORY') private postRepository: typeof Post,
  ) {}

  async addPost(
    content: string,
    @Request() req,
  ): Promise<{
    post: {
      newPost: Post;
      username: any;
    };
  }> {
    try {
      const { id, username } = req.user;
      const newPost = await this.postRepository.create<Post>({
        content,
        userId: id,
      });

      return {
        post: { newPost, username },
      };
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
  async paginationPost(page: number): Promise<Post[]> {
    const offset = (page - 1) * 4;
    const posts = await this.postRepository.findAll<Post>({
      attributes: { exclude: ['deleteBy', 'deletedAt', 'userId'] },
      include: [
        {
          model: User,
          attributes: ['username', 'id', 'email'],
          required: true,
        },
      ],
      offset,
      limit: 4,
      order: [['createdAt', 'DESC']],
    });
    return posts;
  }
  async deletePost(
    postId: number,
    request,
  ): Promise<{
    message: string;
  }> {
    const { id } = request.user;

    try {
      const deletedPost = await this.postRepository.destroy({
        where: {
          userId: id,
          id: postId,
        },
      });

      if (!deletedPost) throw new BadRequestException('Post not exist');

      return {
        message: ' Deleted Successfully',
      };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
  async updatePost(content: string, postId: number, req) {
    try {
      const { id } = req.user;

      const updatedPost = await this.postRepository.update(
        {
          content,
        },
        {
          where: {
            userId: id,
            id: postId,
          },
        },
      );
      if (updatedPost[0])
        return {
          message: 'Updated Successfully ',
        };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
