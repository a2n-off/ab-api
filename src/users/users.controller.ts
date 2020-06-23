import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { Users } from './users.schema';
import { UsersDto } from './users.dto';

@Controller('/users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  getUser(): Promise<Users[]> {
    return this.userService.getUser();
  }

  @Post()
  createUser(@Body() body: UsersDto): Promise<Users> {
    return this.userService.createUser(body.name, body.password);
  }
}
