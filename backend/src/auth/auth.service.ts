import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SignUpDto } from './dto/signup.dto';
import { RefreshToken } from './entities/refresh-token';
import { User } from '../users/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/Login.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(RefreshToken)
    private refreshTokenRepository: Repository<RefreshToken>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {
    console.log(
      'JWT_SECRET in AuthService:',
      this.configService.get<string>('jwt.secret'),
    );
  }

  async create(signUpDto: SignUpDto): Promise<User> {
    const { username, email, password } = signUpDto;

    const emailInUse = await this.userRepository.findOne({ where: { email } });
    if (emailInUse) {
      throw new BadRequestException('Email is already in use');
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = this.userRepository.create({
      username,
      email,
      password: passwordHash,
    });
    return this.userRepository.save(newUser);
  }

  async Login(credential: LoginDto) {
    const { email, password } = credential;

    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('Email is not registered');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Password is incorrect');
    }

    return this.generateJwtToken(user);
  }

  async generateJwtToken(user: User) {
    const payload = { username: user.username, sub: user.id };
    const secret = this.configService.get<string>('JWT_SECRET');
    const refreshToken = uuidv4();

    if (!secret) {
      throw new Error('JWT secret is not defined');
    }

    const refreshTokenEntity = this.refreshTokenRepository.create({
      token: refreshToken,
      expiryDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      user,
    });
    await this.refreshTokenRepository.save(refreshTokenEntity);

    return {
      access_token: this.jwtService.sign(payload, { secret }),
      refreshToken,
    };
  }

  async refreshToken(refreshToken: string) {
    const storedToken = await this.refreshTokenRepository.findOne({
      where: { token: refreshToken },
      relations: ['user'],
    });

    if (!storedToken) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    if (storedToken.expiryDate < new Date()) {
      throw new UnauthorizedException('Refresh token expired');
    }

    const user = storedToken.user;

    // Delete the old refresh token
    await this.refreshTokenRepository.delete({ token: refreshToken });

    // Generate and return a new token
    return this.generateJwtToken(user);
  }
}
