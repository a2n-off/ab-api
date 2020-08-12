import {
  ArgumentsHost,
  ConflictException,
  BadRequestException,
  Catch,
  ExceptionFilter
} from '@nestjs/common';
import { MongoError } from 'mongodb';

@Catch(MongoError)
export class MongoExceptionFilter implements ExceptionFilter {
  catch(exception: MongoError, host: ArgumentsHost): unknown {
    switch (exception.code) {
      case 11000: // duplicate exception
        throw new ConflictException();
      default:
        throw new BadRequestException(`error ${exception.code}`);
    }
  }
}
