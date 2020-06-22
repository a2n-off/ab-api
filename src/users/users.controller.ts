import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { Users } from './users.schema';

@Controller()
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get('/users')
  getUser(): Promise<Users[]> {
    return this.userService.getUser();
  }
}
