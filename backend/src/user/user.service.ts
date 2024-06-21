import {
  Injectable,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { User } from './entities/user.entity';
import { UserRepository } from './user.repository';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly authService: AuthService,
  ) {}

  async register(registerDto: RegisterDto): Promise<User> {
    const { password, confirmPassword } = registerDto;

    if (password !== confirmPassword) {
      throw new BadRequestException('Passwords do not match');
    }
    try {
      const user = await this.userRepository.register(registerDto);
      return user;
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('Email is already taken');
      }
      throw error;
    }
  }

  async login(
    email: string,
    password: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const user = await this.userRepository.login(email, password);
    const { accessToken, refreshToken } = await this.authService.generateTokens(
      user.id,
    );
    return { accessToken, refreshToken };
  }
}
