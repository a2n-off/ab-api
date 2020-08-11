import { createParamDecorator } from '@nestjs/common';

/**
 * return the request
 * @return {unknown} user
 */
export const AuthUser = createParamDecorator((data, ctx) => {
  const req = ctx.switchToHttp().getRequest();
  return req.user;
});

/**
 * return the jwt contain in the request
 * @return {string | undefined} request
 */
export const Jwt = createParamDecorator((data, ctx) => {
  const req = ctx.switchToHttp().getRequest();
  const userBase64: string = req.headers.authorization.split('.');
  if (userBase64 && userBase64[1]) {
    return JSON.parse(Buffer.from(userBase64, 'base64').toString());
  }
  return undefined;
});
