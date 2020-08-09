import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { Users } from '../users/users.schema';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AppService {

  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * return the api version
   * @return {string} hello world + api version
   */
  getHello(): string {
    return 'Hello World! My version is 0.0.1-beta.';
  }

  async login(user: {name: string, password: string}): Promise<string> {
    // check if user exist userAlreadyExist
    const dbUser: Users[] = await this.userService.getUsersByFieldWithPassword('name', user.name);
    if (dbUser.length === 0) {
      throw new BadRequestException(`User ${user.name} doesn't exist`);
    }

    // check the password
    const checkPsw = await bcrypt.compare(user.password, dbUser[0].password);
    if (!checkPsw) {
      throw new ForbiddenException(`Wrong credential for user ${user.name}`);
    }

    // build the jwt
    const payload = {name: dbUser[0].name, role: dbUser[0].level, timestamp: Date()};
    const jwt = await this.jwtService.sign(payload);

    // stock the jwt ?
    await this.userService.editUser(dbUser[0]._id, {jwt});

    return jwt;
  }
}
