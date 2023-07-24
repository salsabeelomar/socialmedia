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
  HttpCode,
  ParseIntPipe,
  HttpStatus,
  UseInterceptors,
} from '@nestjs/common';
import { PostService } from './post.service';
import { PostType } from './dto/post.dto';
import { User } from 'src/common/decorator/user.decorator';
import { Public } from 'src/common/decorator/public.decorator';
import { TransactionInterceptor } from 'src/common/interceptor/Transaction.interceptor';
import { TransactionDeco } from 'src/common/decorator/transaction.decorator';
import { Transaction } from 'sequelize';

@Controller('post')
@UseInterceptors(TransactionInterceptor)
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post('')
  @HttpCode(HttpStatus.CREATED)
  async addPost(
    @Body() { content }: PostType,
    @User() user,
    @TransactionDeco() transaction: Transaction,
  ) {
    return await this.postService.addPost(content, user, transaction);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Get('')
  async paginationPost(
    @Query() { page }: { page: number },
    @TransactionDeco() transaction: Transaction,
  ) {
    return await this.postService.paginationPost(page, transaction);
  }

  @Delete(':postId')
  async deletePost(
    @Param('postId') postId: number,
    @User() { id }: { id: number },
    @TransactionDeco() transaction: Transaction,
  ) {
    return await this.postService.deletePost(postId, id, transaction);
  }

  @Put(':postId')
  async updatePost(
    @Param('postId', ParseIntPipe) postId: number,
    @Body('content') content: string,
    @User() { id }: { id: number },
    @TransactionDeco() transaction: Transaction,
  ) {
    return await this.postService.updatePost(content, postId, id, transaction);
  }
}
