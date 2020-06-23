import { IsString } from 'class-validator';

export class UsersDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly password: string;
}
