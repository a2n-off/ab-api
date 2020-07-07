import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {

  /**
   * return the api version
   * @return {string} hello world + api version
   */
  getHello(): string {
    return 'Hello World! My version is 0.0.1-beta.';
  }
}
