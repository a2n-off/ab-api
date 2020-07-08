import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ArticlesSchema } from './articles.schema';
import { ArticlesController } from './articles.controller';
import { ArticlesService } from './articles.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'articles', schema: ArticlesSchema}])
  ],
  controllers: [ArticlesController],
  providers: [ArticlesService],
})

export class ArticlesModule {}
