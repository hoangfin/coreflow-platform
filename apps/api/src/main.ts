import { MikroORM } from '@mikro-orm/postgresql';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableShutdownHooks();

  await app.get(MikroORM).connect();

  const config = app.get(ConfigService);
  await app.listen(config.getOrThrow<string>('PORT'));
}

await bootstrap();
