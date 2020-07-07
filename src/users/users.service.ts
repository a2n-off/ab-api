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
   * @param {string} field the name
   * @param {string} value the value to filter the data
   * @return {Users[]} the filtered users in the collection
   */
  async getUsersByField(field: string, value: string): Promise<Users[]> {
    const query = {};
    query[field] = value;
    return this.usersModel.aggregate([
      {$match: query},
      {$project: {password: 0}}
    ]);
  }

  /**
   * create one user
   * @param {Users} user user object
   * @return {Users | string} error or success
   */
  async createUser(user: Users): Promise<Users> {
    const newUser = new this.usersModel(user);
    return newUser.save((err: unknown, user: Users) => {
      if (err) {
        throw new BadRequestException(err);
      }
      return `${user.name} created`;
    });
  }

  /**
   * edit one user
   * @param {string} id the user mongo id
   * @param {object} updatedUser the updated data
   * @return {Users} the updated user
   */
  async editUser(id: string, updatedUser: UsersDto): Promise<Users> {
    return this.usersModel.findOneAndUpdate({ _id: id }, updatedUser);
  }

  /**
   * check if a user already exist in the db via the column = value couple
   * @param {string} field the name of the column
   * @param {string} value the discriminant
   * @return {boolean} user exist or not
   */
  async userAlreadyExist(field: string, value: string): Promise<boolean> {
    const userExist = await this.getUsersByField(field, value);
    return userExist.length > 0;
  }
}
