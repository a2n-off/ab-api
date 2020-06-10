import { Injectable } from '@nestjs/common';
import { BladeLogger } from '../logger/logger.service';

@Injectable()
export class AppService {
  constructor(private readonly blade: BladeLogger) {
    this.blade.setCaller('AppService');
  }

  getHello(): string {
    this.blade.log('Hello world');
    return 'Hello World!';
  }
}
