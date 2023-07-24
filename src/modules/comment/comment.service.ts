import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { Comment } from './entities/comment.entity';
import { Transaction } from 'sequelize';
import { CommentType } from './dto/CommentType.dto';
import { ProviderConstants } from 'src/common/constant';
import { User } from '../user/entities/user.entity';
import { CheckExisting } from 'src/common/utils/CheckExisting';

@Injectable()
export class CommentService {
  constructor(
    @Inject(ProviderConstants.COMMENT_REPOSITORY)
    private CommentRepo: typeof Comment,
  ) {}

  async addComment(comment: CommentType, id: number, transaction: Transaction) {
    const newComment = await this.CommentRepo.create(
      {
        userId: id,
        ...comment,
      },
      { transaction: transaction },
    );
    return newComment;
  }

  async paginationComment(
    page: number,
    postId: number,
    transaction: Transaction,
  ) {
    const offset = (page - 1) * 4;
    const comments = await this.CommentRepo.findAll<Comment>({
      attributes: ['id', 'comment', 'createdAt'],
      offset,
      limit: 2,
      where: { postId },
      include: [
        {
          model: User,
          attributes: ['username', 'id', 'email'],
          required: true,
        },
      ],
      order: [['createdAt', 'DESC']],
      transaction: transaction,
    });

    return comments;
  }
  async deleteComment(commentId: number, id: number, transaction: Transaction) {
    const deletedComment = await this.CommentRepo.update<Comment>(
      {
        deleteBy: id,
        deletedAt: new Date(),
      },
      { where: { userId: id, id: commentId }, transaction: transaction },
    );
    CheckExisting(
      deletedComment[0],
      BadRequestException,
      'Theres no comment have this Id',
    );
    return {
      message: 'Comment deleted successfully ',
    };
  }
  async updateComment(
    comment: CommentType,
    commentId: number,
    id: number,
    transaction: Transaction,
  ) {
    const updatedPost = await this.CommentRepo.update<Comment>(
      {
        comment: comment.comment,
      },
      {
        where: {
          userId: id,
          id: commentId,
          postId: comment.postId,
        },
        transaction: transaction,
      },
    );
    CheckExisting(updatedPost[0], BadRequestException, 'Comment not exist');
    return {
      message: 'Comment Updated Successfully ',
    };
  }
}
