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
  UsePipes,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { PostService } from './post.service';
import { PostType } from './dto/post.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @UsePipes(new ValidationPipe())
  @Post('')
  async addPost(@Body() { content }: PostType, @Request() req) {
    return await this.postService.addPost(content, req);
  }

  @Get('')
  async paginationPost(@Query() { page }: { page: number }) {
    return await this.postService.paginationPost(page);
  }

  @Delete('')
  async deletePost(@Param() { postId }: { postId: number }) {
    return await this.postService.deletePost();
  }
  @Put('')
  async updatePost(@Query() { content }: { content: string }) {
    return await this.postService.updatePost();
  }
}
