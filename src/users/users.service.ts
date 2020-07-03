import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Users } from './users.schema';
import { UsersDto } from './users.dto';

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
   * return all the user selected by the column = value couple
   * without the password field
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
   * @return {Users | string} error or success
   */
  async createUser(name: string, password: string): Promise<Users> {
    const user = new this.usersModel({name, password});
    return user.save((err: unknown, user: Users) => {
      if (err) {
        throw new BadRequestException(err);
      }
      return `${user.name} created`;
    });
  }

  /**
   * edit one user
   * @param {string} id the user mongo id
   * @param {object} data the updated data
   * @return {Users} the updated user
   */
  async editUser(id: string, data: UsersDto): Promise<Users> {
    return this.usersModel.findOneAndUpdate({ _id: id }, data);
  }
}
