import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  /**
   * This example contains a hybrid application (HTTP + gRPC)
   * You can switch to a microservice with NestFactory.createMicroservice() as follows:
   *
   * const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
   *  transport: Transport.GRPC,
   *  options: {
   *    package: 'hero',
   *    protoPath: join(__dirname, './hero/hero.proto'),
   *  }
   * });
   * await app.listenAsync();
   *
   */
  const app = await NestFactory.create(AppModule);
  // app.connectMicroservice<MicroserviceOptions>(grpcClientOptions);

  // await app.startAllMicroservicesAsync();
  await app.listen(process.env.PORT || 3001);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
