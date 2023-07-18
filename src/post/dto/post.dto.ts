import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class PostType {
  @IsString()
  @MaxLength(255, {
    message: 'Content is too long',
  })
  @IsNotEmpty({
    message: 'Content is null ',
  })
  Content: string;
}
