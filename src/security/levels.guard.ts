import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { LevelEnum } from '../common/enums/level.enum';

@Injectable()
export class LevelsGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  /**
   * check the user level and returns true or false depending on whether the user has the right or not
   * @param {ExecutionContext} context the route context
   * @return {boolean} boolean
   */
  canActivate(context: ExecutionContext): boolean {
    /** get the levels to the decorator */
    const levels = this.reflector.get<string[]>('levels', context.getHandler());

    /** if decorator has 0 level the route is open */
    if (!levels) {
      return true;
    }

    /**
     * get the level to the request
     * request.user is the "return" of the function validate() in the jwt.strategy.ts
     */
    const request = context.switchToHttp().getRequest();
    const { user } = request;

    /**
     * check if the user have the level
     * @return {boolean} if user have the right or not
     */
    function hasLevel () {
      if (user.level === LevelEnum.admin) {
        return true;
      }
      return levels.some((level: string) => level === user.role);
    }

    /** if user exist && user have a role && role is equal to role route */
    return user && user.level && hasLevel();
  }

}
