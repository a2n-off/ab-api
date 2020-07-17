import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AppService } from './app.service';
import { Levels } from '../security/decorator/levels.decorator';
import { LevelsGuard } from '../security/levels.guard';
import { LevelEnum } from '../utils/enums/level.enum';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**
   * return the version of the api
   * @return {string} hello world + api version
   */
  @UseGuards(AuthGuard('jwt'), LevelsGuard)
  @Levels(LevelEnum.admin)
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
