import { BadRequestException, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async register(registerDto: RegisterDto): Promise<User> {
    const { password, confirmPassword, ...userData } = registerDto;

    if (password !== confirmPassword) {
      throw new BadRequestException('Passwords do not match');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = User.create({
      ...userData,
      password: hashedPassword,
    });

    await user.save();
    return user;
  }

  async login(email: string, password: string): Promise<User> {
    const user = await this.findOne({ where: { email } });
    if (!user) {
      throw new BadRequestException("Email doesn't exist");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new BadRequestException('Wrong Password');
    }

    return user;
  }

  async findByEmail(email: string): Promise<User> {
    return this.findOne({ where: { email } });
  }
}
