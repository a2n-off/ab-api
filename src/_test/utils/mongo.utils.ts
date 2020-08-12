import { MongoClient, Db } from 'mongodb';
import { Document } from 'mongoose';
import { ConfigService } from '../../config/config.service';

/**
 * This file group all functions used commonly in the test files
 */

/**
 * @interface IMongoConnection
 * Store the connection and the db reference on a mongo connection.
 */
export interface IMongoConnection {
  db: Db;
  connection: MongoClient;
}

/**
 * get a mongo instance to make query in the test files direclty on the mongodb
 * @return {db: Db, connection: MongoClient}
 */
export const getMongoConnection = async (): Promise<{db: Db, connection: MongoClient}> => {
  const configService = new ConfigService(`.env.test`);
  const connection = await MongoClient.connect(configService.qualifiedMongoUri(), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = await connection.db(process.env.db_name);

  return { db, connection };
}

/**
 * Transform all mongo ObjectIds to strings. Usefull when trying to compare a result
 * of a mongo query with a result of an API Request returning the result of a mongo query.
 * @param {Document | Document[]} object object to transform
 * @return {Document | Document[]} the transformed object
 */
export const cleanObjectIds = (object: Document | Document[]): Document | Document[] => {
  return JSON.parse(JSON.stringify(object));
}