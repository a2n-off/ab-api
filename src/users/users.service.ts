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
  async getUsers(): Promise<Users[]> {
    return this.usersModel.aggregate([
      {$project: {password: 0}}
    ]);
  }

  /**
   * return all the user selected by the column = value couple
   * without the password field
   * @param {string} column the name of the column
   * @param {string} value the discriminant
   * @return {Users[]} the filtered users in the collection
   */
  async getUsersByColumn(column: string, value: string): Promise<Users[]> {
    const query = {};
    query[column] = value;
    return this.usersModel.aggregate([
      {$match: query},
      {$project: {password: 0}}
    ]);
  }

  /**
   * create one user
   * @param {Users} data user object
   * @return {Users | string} error or success
   */
  async createUser(data: Users): Promise<Users> {
    const user = new this.usersModel(data);
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

  /**
   * check if a user already exist in the db via the column = value couple
   * @param {string} column the name of the column
   * @param {string} value the discriminant
   * @return {boolean} user exist or not
   */
  async userAlreadyExist(column: string, value: string): Promise<boolean> {
    const userExist = await this.getUsersByColumn(column, value);
    return userExist.length > 0;
  }
}
