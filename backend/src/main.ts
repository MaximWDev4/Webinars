import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RedisIoAdapter } from './redis.adapter';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);
  app.enableCors({origin: false});
  app.useWebSocketAdapter(new RedisIoAdapter(app));
  const port = parseInt(process.env.SERVER_PORT);
  await app.listen(port);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
