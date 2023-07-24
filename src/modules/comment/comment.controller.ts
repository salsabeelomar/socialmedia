import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { Transaction } from 'sequelize';

import { CommentService } from './comment.service';
import { User } from 'src/common/decorator/user.decorator';
import { TransactionDeco } from 'src/common/decorator/transaction.decorator';
import { Public } from 'src/common/decorator/public.decorator';
import { CommentType } from './dto/CommentType.dto';
import { TransactionInterceptor } from 'src/common/interceptor/Transaction.interceptor';

@Controller('comment')
@UseInterceptors(TransactionInterceptor)
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post('')
  @HttpCode(HttpStatus.CREATED)
  async addComment(
    @Body() comment: CommentType,
    @User() { id }: { id: number },
    @TransactionDeco() transaction: Transaction,
  ) {
    return await this.commentService.addComment(comment, id, transaction);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Get('')
  async paginationComment(
    @Query('page', ParseIntPipe) page: number,
    @Query('postId', ParseIntPipe) postId: number,
    @TransactionDeco() transaction: Transaction,
  ) {
    return await this.commentService.paginationComment(
      page,
      postId,
      transaction,
    );
  }

  @Delete(':commentId')
  async deletePost(
    @Param('commentId') commentId: number,
    @User() { id }: { id: number },
    @TransactionDeco() transaction: Transaction,
  ) {
    return await this.commentService.deleteComment(commentId, id, transaction);
  }

  @Put(':commentId')
  async updatePost(
    @Param('commentId', ParseIntPipe) commentId: number,
    @Body() comment: CommentType,
    @User() { id }: { id: number },
    @TransactionDeco() transaction: Transaction,
  ) {
    return await this.commentService.updateComment(
      comment,
      commentId,
      id,
      transaction,
    );
  }
}
