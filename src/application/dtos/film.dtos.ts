import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class CreateFilmDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  director: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  episode_id: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  opening_crawl: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  producer?: string;

  @ApiProperty({ type: Types.ObjectId })
  @IsOptional()
  generated_by?: Types.ObjectId;
}

export class UpdateFilmDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  director: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  episode_id: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  opening_crawl: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  producer?: string;

  @ApiProperty({ type: Types.ObjectId })
  @IsOptional()
  generated_by?: Types.ObjectId;
}
