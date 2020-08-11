import { BadRequestException, Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AppService } from './app.service';
import { Levels } from '../security/decorator/levels.decorator';
import { LevelsGuard } from '../security/levels.guard';
import { LevelEnum } from '../common/enums/level.enum';
import { LoginDto } from './login.dto';
import { AuthUser } from '../common/decorators/request.decorator';
import { Users } from '../users/users.schema';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**
   * return the version of the api
   * @return {string} hello world + api version
   */
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  /**
   * return a jwt for the login step
   * @param {{name: string, password: string}} user the credential
   * @return {string} the jwt
   */
  @Post('/login')
  login(@Body() user: LoginDto): Promise<string> {
    return this.appService.login(user);
  }

  /**
   * delete a jwt for the logout step
   * @param {Users} user the user you want to logout
   * @return {Users | BadRequestException} the modified user
   */
  @Post('/logout')
  logout(@AuthUser() user: Users): Promise<Users | BadRequestException> {
    const userId = user._id;

    if (!userId) {
      throw new BadRequestException(`No id provided for logout`);
    }

    return this.appService.logout(userId);
  }

  /**
   * check if the user level is admin
   * @return {boolean} true if the user have the right
   */
  @UseGuards(AuthGuard('jwt'), LevelsGuard)
  @Levels(LevelEnum.admin)
  @Get('check/admin')
  checkAdminLevel(): boolean {
    return true;
  }

  /**
   * check if the user level is user
   * @return {boolean} true if the user have the right
   */
  @UseGuards(AuthGuard('jwt'), LevelsGuard)
  @Levels(LevelEnum.user)
  @Get('check/user')
  checkUserLevel(): boolean {
    return true;
  }
}
