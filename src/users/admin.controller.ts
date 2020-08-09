import { BadRequestException, Body, ConflictException, Controller, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { ConfigService } from '../config/config.service';
import { UsersDto } from './users.dto';
import { Users } from './users.schema';
import { LevelEnum } from '../common/enums/level.enum';
import { UsersController } from './users.controller';
import { AuthGuard } from '@nestjs/passport';
import { Levels } from '../security/decorator/levels.decorator';
import { LevelsGuard } from '../security/levels.guard';

@UseGuards(AuthGuard('jwt'), LevelsGuard)
@Levels(LevelEnum.admin)
@Controller('/admin')
export class AdminController extends UsersController {

  constructor(protected readonly userService: UsersService, protected readonly env: ConfigService) {
    super(userService, env);
  }

  /**
   * create one admin
   * @param {UsersDto} user the user data
   * @return {Users | BadRequestException | ConflictException} the created user
   */
  @Post()
  async createAdmin(@Body() user: UsersDto): Promise<Users | ConflictException | BadRequestException> {
    return this.createUserWithCustomLevel(user, LevelEnum.admin);
  }
}
