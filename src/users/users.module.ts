import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersSchema } from './users.schema';
import { ConfigService } from '../config/config.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'users', schema: UsersSchema }])
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    ConfigService,
  ],
})

export class UsersModule {}
