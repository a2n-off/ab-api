import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Users } from './users.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel('users') private usersModel: Model<Users>) {}

  /**
   * return all the user without the password field
   * @return {Users[]} all the users in the collection
   */
  async getUser(): Promise<Users[]> {
    return this.usersModel.aggregate([
      {$project: {password: 0}}
    ]);
  }

  /**
   * return one user without the password field
   * @return {Users[]} the users in the collection
   */
  async getUserByColumn(column: string, value: string): Promise<Users[]> {
    const query = {};
    query[column] = value;
    return this.usersModel.aggregate([
      {$match: query},
      {$project: {password: 0}}
    ]);
  }

  /**
   * create one user
   * @param {string} name the username
   * @param {string} password the unencrypted password
   * @return {Users}
   */
  async createUser(name: string, password: string): Promise<Users> {
    const user = new this.usersModel({name, password});
    return user.save();
  }
}
