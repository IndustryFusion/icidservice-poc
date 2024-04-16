import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import * as cors from 'cors';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  app.use(cors({
    origin: [process.env.CORS_ORIGIN],
    credentials: true,
  }));
  app.use(cookieParser());
  await app.listen(4010);
}
bootstrap();