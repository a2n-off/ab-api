import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { BladeLogger } from './logger/logger.service';

async function bootstrap() {

  const app = await NestFactory.create(AppModule, {
    logger: new BladeLogger(),
  });

  await app.listen(3001);
}

bootstrap();
