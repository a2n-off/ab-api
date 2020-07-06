import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseFilters,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Users } from './users.schema';
import { UsersDto } from './users.dto';
import { MongoExceptionFilter } from '../utils/mongoExceptionFilter/mongoExceptionFilter';

@Controller('/users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  /**
   * return all the user
   * @return {Users[]} the user collection
   */
  @Get()
  getUsers(): Promise<Users[]> {
    return this.userService.getUsers();
  }

  /**
   * return all the filtered user
   * @param {{column, value}} param the filter
   * @return {Users[]} the filtered user
   */
  @Get('/:column/:value')
  getUsersByColumn(@Param() param: {[key: string]: string}): Promise<Users[]> {
    const { column, value } = param;
    return this.userService.getUsersByColumn(column, value);
  }

  /**
   * create one user
   * @param {UsersDto} body the user data
   * @return {Users} the created user
   */
  @Post()
  @UseFilters(MongoExceptionFilter)
  async createUser(@Body() body: UsersDto): Promise<Users> {

    if (await this.userService.userAlreadyExist('name', body.name)) {
      throw new ConflictException(`${body.name} already exist`)
    }

    return this.userService.createUser(body as Users);
  }

  /**
   * edit one user
   * @param {{id}} param the user id you want to edit
   * @param {UsersDto} body the updated data
   */
  @Put('/:id')
  async editUser(@Param() param: {[key: string]: string}, @Body() body: UsersDto): Promise<Users> {
    const { id } = param;

    const userExist = this.userService.userAlreadyExist('_id', id);
    if (userExist) {
      throw new BadRequestException(`${body.name} doesn't exist`)
    }

    if (body.name) {
      const userExist = this.userService.userAlreadyExist('name', body.name);
      if (userExist) {
        throw new ConflictException(`${body.name} already exist`)
      }
    }

    return this.userService.editUser(id, body);
  }
}
