import { TransformFnParams, Transform } from 'class-transformer';
import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class SignUpType {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(16)
  password: string;

  @IsNumber()
  @IsNotEmpty()
  phoneNumber: number;

  @IsDate()
  @IsNotEmpty()
  @Transform((value) => new Date(value.value as string))
  birthday: Date;
}
