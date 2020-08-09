import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersSchema } from './users.schema';
import { ConfigModule } from '../config/config.module';
import { AdminController } from './admin.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'users', schema: UsersSchema }]),
    ConfigModule
  ],
  controllers: [
    UsersController,
    AdminController
  ],
  providers: [UsersService],
})

export class UsersModule {}
