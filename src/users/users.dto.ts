import { IsNotEmpty, IsString, Length } from 'class-validator';

export class UsersDto {
  @IsString()
  @IsNotEmpty()
  @Length(3)
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;
}
