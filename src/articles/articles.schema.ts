import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Articles extends Document {

  @Prop()
  title: string;

  @Prop()
  date: Date;

  @Prop()
  content: string;

}

export const ArticlesSchema = SchemaFactory.createForClass(Articles);
