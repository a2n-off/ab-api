import { Db } from 'mongodb';
import { Document } from 'mongoose';

export abstract class BaseFactory {

  // Database reference to make mongoose queries
  protected db: Db;

  constructor(db: Db) {
    this.db = db;
  };

  /**
   * Create one entity in database
   * @return {Document} the created entity object instance
   */
  public abstract async createOne(): Promise<Document>;

  /**
   * Create multiple entities in database 
   * @param {number} amount the amount of objects to generate
   * @return {Document[]} the created entities objects instances  
   */
  public abstract async createMany(amount: number): Promise<Document[]>;
  
}