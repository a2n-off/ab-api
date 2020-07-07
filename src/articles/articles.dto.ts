import { IsDate, IsMongoId, IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';
import { Schema as mongooseSchema } from "mongoose";

export class ArticlesDto {
  @IsString()
  @IsNotEmpty()
  @Length(3)
  readonly title: string;

  @IsDate()
  @IsOptional()
  readonly date: Date;

  @IsString()
  @IsNotEmpty()
  @Length(10)
  readonly content: string;

  @IsMongoId()
  @IsNotEmpty()
  readonly authorId: {type: mongooseSchema.Types.ObjectId, ref: 'users'};

  @IsMongoId()
  @IsNotEmpty()
  readonly categoryId: {type: mongooseSchema.Types.ObjectId, ref: 'categories'};
}
