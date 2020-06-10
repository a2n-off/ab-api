import { Module } from '@nestjs/common';
import { BladeLogger } from './logger.service';

@Module({
  providers: [BladeLogger],
  exports: [BladeLogger],
})
export class LoggerModule {}
