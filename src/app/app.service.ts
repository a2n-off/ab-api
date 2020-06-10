import { Injectable } from '@nestjs/common';
import { Logger } from 'nestjs-pino/dist';

@Injectable()
export class AppService {
  constructor(private readonly logger: Logger) {}

  getHello(): string {
    this.logger.log('log', AppService.name);
    return 'Hello World!';
  }
}
