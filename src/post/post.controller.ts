import {
  Body,
  Controller,
  Post,
  Request,
  Get,
  Query,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { PostService } from './post.service';
import { PostType } from './dto/post.dto';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post('')
  async addPost(@Body() post: PostType, @Request() req) {
    await this.postService.addPost();
  }

  @Get('')
  async paginationPost(@Query() { page }: { page: number }) {
    await this.postService.paginationPost(page);
  }

  @Delete('')
  async deletePost(@Param() { postId }: { postId: number }) {
    await this.postService.deletePost();
  }
  @Put('')
  async updatePost(@Query() { content }: { content: string }) {
    await this.postService.updatePost();
  }
}
