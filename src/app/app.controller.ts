import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**
   * return the version of the api
   * @return {string} hello world + api version
   */
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
