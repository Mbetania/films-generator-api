import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';
import { PASSWORD_REGEX } from '../types';
import { EUserRole } from '../enums';

export class SignupDTO {
  @ApiProperty({
    description: 'Email to create user',
    example: 'user@mail.com',
    type: String,
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'User password',
    example: '#Password_8197',
    type: String,
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @Matches(PASSWORD_REGEX, {
    message:
      'Invalid password, min: 1 lowercase, 1 uppercase, 1 number and 1 special character',
  })
  password: string;

  @ApiProperty({ type: String, description: 'ADMIN || REGULAR' })
  role: string | EUserRole;
}

export class SignInDTO {
  @ApiProperty({
    description: 'Email to create user',
    example: 'user@mail.com',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'User password',
    example: '123456',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  @Matches(/^[0-9]{6}$/, {
    message: 'Invalid password, only numbers and required six digits.',
  })
  password: string;
}

export class TokenPayloadDTO {
  _id: string;
  iat?: number;
  exp?: number;
  role: EUserRole;
}
