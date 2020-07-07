import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as mongooseSchema } from 'mongoose';

@Schema()
export class Articles extends Document {

  @Prop()
  title: string;

  @Prop({default: Date.now})
  date: Date;

  @Prop()
  content: string;

  @Prop()
  categoryId: {type: mongooseSchema.Types.ObjectId, ref: 'categories'};

  @Prop()
  authorId: {type: mongooseSchema.Types.ObjectId, ref: 'users'};

}

export const ArticlesSchema = SchemaFactory.createForClass(Articles);
