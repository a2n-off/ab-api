import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino/dist';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';
import { UsersModule } from '../users/users.module';
import { ArticlesModule } from '../articles/articles.module';
import { CategoriesModule } from '../categories/categories.module';
import { JwtStrategy } from '../security/strategy/jwt.strategy';
import { UsersSchema } from '../users/users.schema';

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
        uri: env.qualifiedMongoUri(),
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    MongooseModule.forFeature([{ name: 'users', schema: UsersSchema }]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (env: ConfigService) => ({
        secret: env.get('jwt_secret'),
        signOptions: { expiresIn: '300s' },
      }),
    }),
    ConfigModule,
    UsersModule,
    ArticlesModule,
    CategoriesModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    JwtStrategy
  ],
})

export class AppModule {}
