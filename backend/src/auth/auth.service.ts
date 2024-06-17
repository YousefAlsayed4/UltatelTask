import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SignUpDto } from './dto/signup.dto';
import { User } from '../users/entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(signUpDto: SignUpDto): Promise<User> {
    const { username, email, password } = signUpDto;

    // Check if email is already in use
    const emailInUse = await this.userRepository.findOne({ where: { email } });
    if (emailInUse) {
      throw new BadRequestException('Email is already in use');
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create a new user entity
    const newUser = this.userRepository.create({
      username,
      email,
      password: passwordHash,
    });
    return this.userRepository.save(newUser);
  }
}
