import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class PostType {
  @IsString()
  @MaxLength(255, {
    message: 'content is too long',
  })
  @IsNotEmpty({
    message: 'content is null ',
  })
  content: string;
}
