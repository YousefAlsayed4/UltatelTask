import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RefreshTokenRepository } from '../token/refresh-token.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly refreshTokenRepository: RefreshTokenRepository,
  ) {}

  async generateTokens(
    userId: number,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const payload = { userId };
    const accessToken = this.jwtService.sign(payload, { expiresIn: '7d' });
    const refreshToken = await this.generateRefreshToken(userId);
    return { accessToken, refreshToken };
  }

  private async generateRefreshToken(userId: number): Promise<string> {
    const payload = { userId };
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });
    await this.refreshTokenRepository.create(userId, refreshToken);
    return refreshToken;
  }

  async verifyRefreshToken(token: string): Promise<any> {
    try {
      return this.jwtService.verify(token);
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async verifyToken(token: string): Promise<any> {
    try {
      return this.jwtService.verify(token);
    } catch (e) {
      throw new Error('Invalid token');
    }
  }
}
