import { BadRequestException, Body, ConflictException, Controller, Post } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersService } from './users.service';
import { ConfigService } from '../config/config.service';
import { UsersDto } from './users.dto';
import { Users } from './users.schema';
import { LevelEnum } from '../utils/enums/level.enum';

@Controller('/admin')
export class AdminController {
  private readonly bcryptSalt: string;

  constructor(private readonly userService: UsersService, private readonly env: ConfigService) {
    this.bcryptSalt = this.env.get('bcryptSalt');
  }

  /**
   * create one admin
   * @param {UsersDto} user the user data
   * @return {Users | BadRequestException | ConflictException} the created user
   */
  @Post()
  async createAdmin(@Body() user: UsersDto): Promise<Users | ConflictException | BadRequestException> {

    /** user name already exist */
    if (await this.userService.userAlreadyExist('name', user.name)) {
      throw new ConflictException(`${user.name} already exist`)
    }

    /** set password */
    const bcryptUser = user as Users;
    await bcrypt.hash(user.password, this.bcryptSalt, (err: Error, hash: string) => {
      if (err) {
        throw new BadRequestException(`error during bcrypt.hash for the user ${user.name} - ${err.message}`)
      }
      bcryptUser.password = hash;
    })

    /** set role */
    bcryptUser.level = LevelEnum.admin;

    return this.userService.createUser(bcryptUser);
  }
}
