// src/app.controller.ts
import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AppController {
  constructor(private configService: ConfigService) {}

  @Get('env')
  getEnvVariables() {
    const dbHost = this.configService.get<string>('DATABASE_HOST');
    const jwtSecret = this.configService.get<string>('JWT_SECRET');
    console.log('DATABASE_HOST:', dbHost);
    console.log('JWT_SECRET:', jwtSecret);
    return {
      DATABASE_HOST: dbHost,
      JWT_SECRET: jwtSecret,
    };
  }
}
