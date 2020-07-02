import { Body, Controller, Get, Param, Post } from '@nestjs/common';
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

  @Get('/:column/:value')
  getUserByColumn(@Param() param: {[key: string]: string}): Promise<Users[]> {
    const { column, value } = param;
    return this.userService.getUserByColumn(column, value);
  }

  @Post()
  createUser(@Body() body: UsersDto): Promise<Users> {
    return this.userService.createUser(body.name, body.password);
  }
}
