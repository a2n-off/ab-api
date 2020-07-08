import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino/dist';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';
import { UsersModule } from '../users/users.module';
import { ArticlesModule } from '../articles/articles.module';
import { CategoriesModule } from '../categories/categories.module';

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        prettyPrint: {
          colorize: true,
          levelFirst: true,
          translateTime: 'UTC:mm/dd/yyyy, h:MM:ss TT Z',
        }
      }
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (env: ConfigService) => ({
        uri: process.env.MONGO_URL || `mongodb://${env.get('db_user')}:${env.get('db_pass')}@${env.get('db_uri')}:${env.get('db_port')}/${env.get('db_name')}`,
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
    }),
    ConfigModule,
    UsersModule,
    ArticlesModule,
    CategoriesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
