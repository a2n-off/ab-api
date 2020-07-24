import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { LevelEnum } from '../common/enums/level.enum';

@Schema()
export class Users extends Document {

  @Prop()
  name: string;

  @Prop()
  password: string;

  @Prop()
  level: LevelEnum;

}

export const UsersSchema = SchemaFactory.createForClass(Users);
