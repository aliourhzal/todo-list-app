import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: 'http://10.11.100.162:5173',
      credentials: true
    }
  });
  app.useGlobalPipes(new ValidationPipe());
  // app.enableCors({
  //   origin: '*',
  //   credentials: true
  // })
  app.use(cookieParser());
  await app.listen(3000);
}
bootstrap();
