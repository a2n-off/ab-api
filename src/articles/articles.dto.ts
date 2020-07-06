import { IsDate, IsNotEmpty, IsString, Length } from 'class-validator';

export class ArticlesDto {
  @IsString()
  @IsNotEmpty()
  @Length(3)
  readonly title: string;

  @IsDate()
  @IsNotEmpty()
  readonly date: Date;

  @IsString()
  @IsNotEmpty()
  @Length(10)
  readonly content: string;
}
