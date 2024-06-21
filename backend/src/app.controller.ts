// import { Controller, Get, UseGuards } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// import { AuthGuard } from './common/guard/auth.guard';

// @UseGuards(AuthGuard)
// @Controller()
// export class AppController {
//   constructor(private configService: ConfigService) {}

//   @Get()
//   someProtectedRoute() {
//     return {
//       message: 'This is a protected route',
//     };
//   }

//   @Get('env')
//   getEnvVariables() {
//     const dbHost = this.configService.get<string>('DATABASE_HOST');
//     const jwtSecret = this.configService.get<string>('JWT_SECRET');
//     console.log('DATABASE_HOST:', dbHost);
//     console.log('JWT_SECRET:', jwtSecret);
//     return {
//       DATABASE_HOST: dbHost,
//       JWT_SECRET: jwtSecret,
//     };
//   }
// }
import { Controller } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
}
