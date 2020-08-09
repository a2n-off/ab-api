import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class UsersDto {
  @IsString()
  @IsNotEmpty()
  @Length(3)
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;
}

export class UpdateUsersDto {
  @IsString()
  @IsOptional()
  @Length(3)
  readonly name?: string;

  @IsString()
  @IsOptional()
  readonly password?: string;

  @IsString()
  @IsOptional()
  readonly jwt?: string;
}
