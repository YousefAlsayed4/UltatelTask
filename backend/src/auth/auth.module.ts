import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RefreshToken } from 'src/token/refresh-token.entity';
import { RefreshTokenRepository } from 'src/token/refresh-token.repository';
@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'your-secret-key',
      signOptions: { expiresIn: '7d' },
    }),
    TypeOrmModule.forFeature([RefreshToken]),
  ],
  providers: [AuthService, AuthGuard, RefreshTokenRepository],
  exports: [AuthService, JwtModule, AuthGuard, RefreshTokenRepository],
})
export class AuthModule {}
