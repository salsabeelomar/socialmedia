import {
  Inject,
  Injectable,
  InternalServerErrorException,
  BadRequestException,
  Request,
} from '@nestjs/common';
import { Post } from './entities/post.entity';
import { PostType } from './dto/post.dto';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class PostService {
  constructor(
    @Inject('POSTS_REPOSITORY') private postRepository: typeof Post,
  ) {}

  async addPost(content: string, @Request() req) {
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
  async deletePost(postId: number, request) {
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
  async updatePost() {
    // await this.postRepository.update();
  }
}
