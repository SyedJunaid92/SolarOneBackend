import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { urlencoded, json } from 'express';
import { ValidationPipe } from '@nestjs/common';
import { join } from 'path'
import * as dotenv from 'dotenv';
import * as express from 'express'
import { connectDB }  from './helperfunction/db';

dotenv.config();



async function bootstrap() {
  
  const app = await NestFactory.create(AppModule,{
    cors: true,
  });

  connectDB();
  app.use(json({ limit: '500mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));
  app.setGlobalPrefix('api');
  app.use('/public', express.static(join(__dirname, '..', 'public')))

  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true
  });

  app.useGlobalPipes(new ValidationPipe())
  await app.listen(process.env.PORT);
  console.log('Project is running at: ', process.env.PORT)
  
}
bootstrap();
