import { IsString, IsNotEmpty, MaxLength, IsInt } from 'class-validator';

export class CommentType {
  @IsString()
  @MaxLength(255, {
    message: 'content is too long',
  })
  @IsNotEmpty({
    message: 'content is null ',
  })
  comment: string

  @IsInt()
  @IsNotEmpty()
  postId: number;
}
