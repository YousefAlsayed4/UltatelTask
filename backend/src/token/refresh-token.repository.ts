import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RefreshToken } from './refresh-token.entity';

@Injectable()
export class RefreshTokenRepository {
  constructor(
    @InjectRepository(RefreshToken)
    private refreshTokenRepository: Repository<RefreshToken>,
  ) {}

  async create(userId: number, token: string): Promise<void> {
    await this.refreshTokenRepository.save({ userId, token });
  }

  async findByUserId(userId: number): Promise<RefreshToken | undefined> {
    return this.refreshTokenRepository.findOne({ where: { userId } });
  }

  async deleteByUserId(userId: number): Promise<void> {
    await this.refreshTokenRepository.delete({ userId });
  }
}
