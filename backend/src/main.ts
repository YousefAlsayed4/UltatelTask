import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  // const corsOptions: CorsOptions = {
  //   origin: ['http://localhost:4200'], // Allow your frontend URL here
  //   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  //   allowedHeaders: 'Content-Type,Authorization',
  //   credentials: true, // Allow session cookies
  // };
  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['*'],
  });
  // Enable CORS with options
  // app.enableCors(corsOptions);
  const configService = app.get(ConfigService);
  console.log('JWT_SECRET:', configService.get<string>('jwt.secret'));
  await app.listen(3000);
}
bootstrap();
