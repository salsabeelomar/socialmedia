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
  HttpCode,
  ParseIntPipe,
  HttpStatus,
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
  @HttpCode(HttpStatus.CREATED)
  async addPost(@Body() { content }: PostType, @Request() req) {
    return await this.postService.addPost(content, req);
  }

  @HttpCode(HttpStatus.OK)
  @Get('')
  async paginationPost(@Query() { page }: { page: number }) {
    return await this.postService.paginationPost(page);
  }

  @Delete(':postId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deletePost(
    @Param('postId', ParseIntPipe) postId: number,
    @Request() req,
  ) {
    return await this.postService.deletePost(postId, req);
  }

  @Put(':id')
  async updatePost(
    @Param('id', ParseIntPipe) id: number,
    @Body('content') content: string,
    @Request() req,
  ) {
    return await this.postService.updatePost(content, id, req);
  }
}
