import { IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly password: string;
}
