import { Module } from '@nestjs/common';
import { CategoriesSchema } from './categories.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'categories', schema: CategoriesSchema}])
  ],
  controllers: [CategoriesController],
  providers: [CategoriesService],
})

export class CategoriesModule {}
