import { Db, InsertOneWriteOpResult, InsertWriteOpResult } from 'mongodb';
import * as faker from 'faker';
import * as bcrypt from 'bcrypt';

import { BaseFactory } from './base.factory';
import { Users } from '../../users/users.schema';
import { LevelEnum } from '../../common/enums/level.enum';

export class UsersFactory extends BaseFactory {
  
  private static instance: UsersFactory;
  
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor(db: Db) {
    super(db);
  }
  
  /**
   * Singleton method to get the only one instance of the class
   */
  public static getInstance(db: Db): UsersFactory {
    if (!UsersFactory.instance) {
      UsersFactory.instance = new UsersFactory(db);
    } 
    
    return UsersFactory.instance;
  }
  
  /**
   * Create one User
   * @return {Users} one Users object inserted in mongodb collection
   */
  public async createOne(): Promise<Users> {
    const user = {
      name: faker.name.firstName(),
      password: await bcrypt.hash(faker.random.word(), 10),
      level: LevelEnum.user,
    } as Users;

    const { ops }: InsertOneWriteOpResult<Users> = await this.db.collection('users').insertOne(user);
    return ops[0];
  }
  
  /**
   * Create many Users
   * @param {number} amount amount of Users to generate
   * @return {Users[]} users objects inserted in mongodb collection
   */
  public async createMany(amount: number): Promise<Users[]> {
    const users = await Promise.all(
      Array.from(Array(amount), async (): Promise<Users> => (
        {
          name: faker.name.firstName(),
          password: await bcrypt.hash(faker.random.word(), 10),
          level: LevelEnum.user,
        } as Users
      ))
    );
 
    const { ops }: InsertWriteOpResult<Users> = await this.db.collection('users').insertMany(users);
    return ops;
  }  
}