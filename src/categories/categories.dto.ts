import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CategoriesDto {
  @IsString()
  @IsNotEmpty()
  @Length(3)
  readonly name: string
}
