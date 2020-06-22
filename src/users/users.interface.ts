import * as mongoose from 'mongoose';

export interface IUsers extends mongoose.Document {
  name: string;
  password: string;
}
