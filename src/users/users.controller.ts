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
   * @param {string} field the field name
   * @param {string} value the value to filter the data
   * @return {Users[]} the filtered user
   */
  @Get('/:field/:value')
  getUsersByField(@Param('field') field: string, @Param('value') value: string): Promise<Users[]> {
    return this.userService.getUsersByField(field, value);
  }

  /**
   * create one user
   * @param {UsersDto} user the user data
   * @return {Users} the created user
   */
  @Post()
  @UseFilters(MongoExceptionFilter)
  async createUser(@Body() user: UsersDto): Promise<Users> {

    /** user name already exist */
    if (await this.userService.userAlreadyExist('name', user.name)) {
      throw new ConflictException(`${user.name} already exist`)
    }

    // todo bcrypt password

    return this.userService.createUser(user as Users);
  }

  /**
   * edit one user
   * @param {string} id the user id you want to edit
   * @param {UsersDto} updatedUser the updated user data
   */
  @Put('/:id')
  async editUser(@Param('id') id: string, @Body() updatedUser: UsersDto): Promise<Users> {

    /** user doesn't exist */
    const userExist = await this.userService.userAlreadyExist('_id', id);
    if (!userExist) {
      throw new BadRequestException(`${updatedUser.name} doesn't exist`)
    }

    /** updated user name already exist */
    if (updatedUser.name) {
      const userNameExist = await this.userService.userAlreadyExist('name', updatedUser.name);
      if (userNameExist) {
        throw new ConflictException(`${updatedUser.name} already exist`)
      }
    }

    /** updated password bcrypt */
    if (updatedUser.password) {
      // todo bcrypt password
      // todo test action
    }

    return this.userService.editUser(id, updatedUser);
  }
}
