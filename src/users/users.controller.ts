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
import * as bcrypt from 'bcrypt';
import { ConfigService } from '../config/config.service';

@Controller('/users')
export class UsersController {

  private readonly bcrypt_salt: string;

  constructor(private readonly userService: UsersService, private readonly env: ConfigService) {
    this.bcrypt_salt = this.env.get('bcrypt_salt');
  }

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

    let bcryptUser = user as Users;
    await bcrypt.hash(user.password, this.bcrypt_salt, (err: Error, hash: string) => {
      if (err) {
        throw new BadRequestException(`error during bcrypt.hash for the user ${user.name} - ${err.message}`)
      }
      bcryptUser.password = hash;
    })

    return this.userService.createUser(bcryptUser);
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
    let bcryptUser = updatedUser as Users;
    if (updatedUser.password) {
      await bcrypt.hash(updatedUser.password, this.bcrypt_salt, (err: Error, hash: string) => {
        if (err) {
          throw new BadRequestException(`error during bcrypt.hash for the user ${updatedUser.name} - ${err.message}`)
        }
        bcryptUser.password = hash;
      })
    }

    return this.userService.editUser(id, bcryptUser);
  }
}
