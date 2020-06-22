import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Users extends Document {

  @Prop({unique: true, minlength: 3, required: true, validate: value => {return value.length === 4}})
  name: string;

  @Prop({required: true})
  password: string;

}

export const UsersSchema = SchemaFactory.createForClass(Users);
