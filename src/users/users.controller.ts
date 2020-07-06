import { Body, Controller, Get, Param, Post, Put, UseFilters } from '@nestjs/common';
import { UsersService } from './users.service';
import { Users } from './users.schema';
import { UsersDto } from './users.dto';
import { MongoExceptionFilter } from '../utils/mongoExceptionFilter/mongoExceptionFilter';

@Controller('/users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  getUsers(): Promise<Users[]> {
    return this.userService.getUsers();
  }

  @Get('/:column/:value')
  getUsersByColumn(@Param() param: {[key: string]: string}): Promise<Users[]> {
    const { column, value } = param;
    return this.userService.getUsersByColumn(column, value);
  }

  @Post()
  @UseFilters(MongoExceptionFilter)
  createUser(@Body() body: UsersDto): Promise<Users> {
    return this.userService.createUser(body.name, body.password);
  }

  @Put('/:id')
  editUser(@Param() param: {[key: string]: string}, @Body() body: UsersDto): Promise<Users> {
    const { id } = param;
    return this.userService.editUser(id, body);
  }
}
